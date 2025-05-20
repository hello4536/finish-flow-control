
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[CHECK-SUBSCRIPTION] ${step}${detailsStr}`);
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
    
    if (orgMemberError) {
      logStep("User has no organization", { userId: user.id });
      return new Response(JSON.stringify({ 
        subscribed: false,
        subscription_status: "inactive",
        subscription_tier: null,
        subscription_end_date: null
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }
    
    // Get organization details
    const { data: org, error: orgError } = await supabaseClient
      .from("organizations")
      .select("*")
      .eq("id", orgMember.organization_id)
      .single();
    
    if (orgError) throw new Error(`Organization error: ${orgError.message}`);
    
    logStep("Retrieved organization", { orgId: org.id, name: org.name });

    // If no Stripe customer ID, no subscription
    if (!org.stripe_customer_id) {
      logStep("Organization has no Stripe customer ID");
      
      // Update organization subscription status to be sure
      await supabaseClient
        .from("organizations")
        .update({
          subscription_status: "inactive",
          subscription_end_date: null,
          subscription_tier: null
        })
        .eq("id", org.id);
      
      return new Response(JSON.stringify({ 
        subscribed: false,
        subscription_status: "inactive",
        subscription_tier: null,
        subscription_end_date: null 
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    // Initialize Stripe
    const stripe = new Stripe(stripeKey, { apiVersion: "2023-10-16" });
    
    // Check for active subscriptions
    const subscriptions = await stripe.subscriptions.list({
      customer: org.stripe_customer_id,
      status: "active",
      expand: ["data.items.data.price.product"]
    });
    
    logStep("Retrieved subscriptions", { count: subscriptions.data.length });
    
    // If no active subscriptions, update org and return inactive
    if (subscriptions.data.length === 0) {
      await supabaseClient
        .from("organizations")
        .update({
          subscription_status: "inactive",
          subscription_end_date: null,
          subscription_tier: null
        })
        .eq("id", org.id);
      
      return new Response(JSON.stringify({ 
        subscribed: false,
        subscription_status: "inactive",
        subscription_tier: null,
        subscription_end_date: null 
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }
    
    // We have an active subscription
    const subscription = subscriptions.data[0];
    const currentPeriodEnd = new Date(subscription.current_period_end * 1000).toISOString();
    
    // Count the number of admin and employee seats
    let adminSeats = 0;
    let employeeSeats = 0;
    
    subscription.items.data.forEach(item => {
      const priceId = item.price.id;
      
      if (priceId.includes("admin")) {
        adminSeats = item.quantity || 1;
      } else if (priceId.includes("employee")) {
        employeeSeats = item.quantity || 0;
      }
    });
    
    logStep("Subscription seats", { adminSeats, employeeSeats });
    
    // Get the admin price item for tier identification
    const adminItem = subscription.items.data.find(item => 
      item.price.id.includes("admin")
    );
    
    // Find the subscription tier that matches the Stripe price ID
    let tierId = null;
    let tierData = null;
    
    if (adminItem) {
      const { data: tierInfo, error: tierError } = await supabaseClient
        .from("subscription_tiers")
        .select("*")
        .eq("stripe_price_id", adminItem.price.id)
        .single();
      
      if (!tierError) {
        tierId = tierInfo.id;
        tierData = tierInfo;
        logStep("Found matching subscription tier", { 
          tierId,
          name: tierInfo.name,
          price: tierInfo.price
        });
      } else {
        logStep("No matching subscription tier found", { priceId: adminItem.price.id });
      }
    }
    
    // Update organization subscription status
    await supabaseClient
      .from("organizations")
      .update({
        subscription_status: "active",
        subscription_end_date: currentPeriodEnd,
        subscription_tier: tierId
      })
      .eq("id", org.id);
    
    logStep("Updated organization subscription info", {
      status: "active",
      tier: tierId,
      endDate: currentPeriodEnd
    });
    
    // Calculate number of employees in the organization for comparison
    const { count: orgEmployeeCount, error: countError } = await supabaseClient
      .from("org_members")
      .select("*", { count: 'exact', head: true })
      .eq("organization_id", org.id);
    
    if (!countError) {
      logStep("Organization member count", { 
        dbCount: orgEmployeeCount, 
        stripeTotal: adminSeats + employeeSeats 
      });
      
      // If counts don't match and we have more users than seats, sync with Stripe
      if (orgEmployeeCount > adminSeats + employeeSeats) {
        logStep("Member count mismatch - more members than seats");
      }
    }
    
    return new Response(JSON.stringify({ 
      subscribed: true,
      subscription_status: "active",
      subscription_tier: tierId,
      subscription_tier_name: tierData?.name || null,
      subscription_end_date: currentPeriodEnd,
      admin_seats: adminSeats,
      employee_seats: employeeSeats,
      total_members: orgEmployeeCount || (adminSeats + employeeSeats)
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("[CHECK-SUBSCRIPTION] Error:", errorMessage);
    
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
