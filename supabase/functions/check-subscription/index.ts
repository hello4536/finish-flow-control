
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
      expand: ["data.plan.product"]
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
    
    // Get subscription tier
    const priceId = subscription.items.data[0].price.id;
    
    // Find the subscription tier that matches the Stripe price ID
    const { data: tierData, error: tierError } = await supabaseClient
      .from("subscription_tiers")
      .select("*")
      .eq("stripe_price_id", priceId)
      .single();
    
    let tierId = null;
    if (tierError) {
      logStep("No matching subscription tier found", { priceId });
    } else {
      tierId = tierData.id;
      logStep("Found matching subscription tier", { 
        tierId,
        name: tierData.name,
        price: tierData.price
      });
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
    
    return new Response(JSON.stringify({ 
      subscribed: true,
      subscription_status: "active",
      subscription_tier: tierId,
      subscription_tier_name: tierData?.name || null,
      subscription_end_date: currentPeriodEnd 
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
