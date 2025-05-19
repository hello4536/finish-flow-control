
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[CUSTOMER-PORTAL] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Function started");

    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) throw new Error("STRIPE_SECRET_KEY is not set");
    
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) throw new Error("No authorization header provided");
    
    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: userError } = await supabaseClient.auth.getUser(token);
    
    if (userError) throw new Error(`Authentication error: ${userError.message}`);
    const user = userData.user;
    if (!user?.email) throw new Error("User not authenticated or email not available");
    
    logStep("User authenticated", { userId: user.id, email: user.email });

    // Get user's organization
    const { data: orgMember, error: orgMemberError } = await supabaseClient
      .from("org_members")
      .select("organization_id")
      .eq("user_id", user.id)
      .single();
    
    if (orgMemberError) throw new Error(`Organization error: ${orgMemberError.message}`);
    
    // Get user's role
    const { data: userRole, error: roleError } = await supabaseClient
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id)
      .single();
    
    if (roleError) throw new Error(`Role error: ${roleError.message}`);
    
    // Check if user is admin
    if (userRole.role !== "admin") throw new Error("Only admin users can manage subscriptions");
    
    // Get organization details
    const { data: org, error: orgError } = await supabaseClient
      .from("organizations")
      .select("*")
      .eq("id", orgMember.organization_id)
      .single();
    
    if (orgError) throw new Error(`Organization error: ${orgError.message}`);
    
    logStep("Retrieved organization", { orgId: org.id, name: org.name });

    // If no Stripe customer ID, cannot open portal
    if (!org.stripe_customer_id) throw new Error("No subscription found for this organization");

    // Initialize Stripe
    const stripe = new Stripe(stripeKey, { apiVersion: "2023-10-16" });
    
    // Get request body for return URL
    const requestData = await req.json();
    const { returnUrl = "" } = requestData;
    
    // Create Stripe customer portal session
    const portalSession = await stripe.billingPortal.sessions.create({
      customer: org.stripe_customer_id,
      return_url: returnUrl || `${req.headers.get("origin")}/settings`,
    });
    
    logStep("Created customer portal session", { sessionId: portalSession.id, url: portalSession.url });

    return new Response(JSON.stringify({ url: portalSession.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("[CUSTOMER-PORTAL] Error:", errorMessage);
    
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
