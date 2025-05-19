
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[CREATE-CHECKOUT] ${step}${detailsStr}`);
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
    
    // Get organization details
    const { data: org, error: orgError } = await supabaseClient
      .from("organizations")
      .select("*")
      .eq("id", orgMember.organization_id)
      .single();
    
    if (orgError) throw new Error(`Organization error: ${orgError.message}`);
    
    logStep("Retrieved organization", { orgId: org.id, name: org.name });

    // Determine which subscription tier to use based on user role
    const isAdmin = userRole.role === "admin";
    const priceTier = isAdmin ? "price_admin_monthly" : "price_employee_monthly";
    logStep("Determined price tier", { isAdmin, priceTier });

    // Initialize Stripe
    const stripe = new Stripe(stripeKey, { apiVersion: "2023-10-16" });
    
    // Check if organization already has a Stripe customer ID
    let customerId = org.stripe_customer_id;
    
    if (!customerId) {
      // Create a new customer in Stripe
      const customer = await stripe.customers.create({
        email: user.email,
        name: org.name,
        metadata: {
          organization_id: org.id
        }
      });
      
      customerId = customer.id;
      
      // Update organization with the Stripe customer ID
      await supabaseClient
        .from("organizations")
        .update({ stripe_customer_id: customerId })
        .eq("id", org.id);
      
      logStep("Created Stripe customer", { customerId });
    } else {
      logStep("Using existing Stripe customer", { customerId });
    }

    // Get request body for custom parameters
    const requestData = await req.json();
    const { returnUrl = "" } = requestData;
    
    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceTier, // Use the Stripe price ID
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: returnUrl ? `${returnUrl}?success=true` : `${req.headers.get("origin")}/?success=true`,
      cancel_url: returnUrl || `${req.headers.get("origin")}/pricing`,
      metadata: {
        organization_id: org.id,
        user_id: user.id,
        role: userRole.role,
      },
    });

    logStep("Created checkout session", { sessionId: session.id, url: session.url });

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("[CREATE-CHECKOUT] Error:", errorMessage);
    
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
