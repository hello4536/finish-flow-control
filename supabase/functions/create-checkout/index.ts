
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

    // Calculate number of employees in the organization
    const { count: employeeCount, error: countError } = await supabaseClient
      .from("org_members")
      .select("*", { count: 'exact', head: true })
      .eq("organization_id", org.id);
    
    if (countError) throw new Error(`Error counting employees: ${countError.message}`);
    
    // Calculate number of admin users
    const { count: adminCount, error: adminCountError } = await supabaseClient
      .from("user_roles")
      .select("*", { count: 'exact', head: true })
      .eq("role", "admin")
      .in("user_id", 
        supabaseClient.from("org_members")
          .select("user_id")
          .eq("organization_id", org.id)
      );
    
    if (adminCountError) throw new Error(`Error counting admins: ${adminCountError.message}`);
    
    // Number of employee seats needed
    const employeeSeats = Math.max(0, employeeCount - adminCount);
    
    logStep("Organization stats", { 
      totalMembers: employeeCount, 
      adminUsers: adminCount,
      regularEmployees: employeeSeats
    });

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
    const { returnUrl = "", tierId = "" } = requestData;
    
    // Get subscription tier details if provided
    let tierData = null;
    if (tierId) {
      const { data: tier, error: tierError } = await supabaseClient
        .from("subscription_tiers")
        .select("*")
        .eq("id", tierId)
        .single();
      
      if (tierError) {
        logStep("Error fetching tier", { tierId, error: tierError.message });
      } else {
        tierData = tier;
        logStep("Found tier", { tierId, name: tier.name });
      }
    }
    
    // Get subscription tiers with actual Stripe price IDs
    logStep("Fetching subscription tiers from database");
    const { data: subscriptionTiers, error: tiersError } = await supabaseClient
      .from("subscription_tiers")
      .select("*")
      .in("name", ["Professional Plan", "Additional Employee"]);

    if (tiersError) {
      logStep("Error fetching subscription tiers", tiersError);
      throw new Error(`Failed to fetch subscription tiers: ${tiersError.message}`);
    }

    if (!subscriptionTiers || subscriptionTiers.length === 0) {
      logStep("No subscription tiers found");
      throw new Error("No subscription tiers configured");
    }

    const professionalPlan = subscriptionTiers.find(tier => tier.name === "Professional Plan");
    const employeePlan = subscriptionTiers.find(tier => tier.name === "Additional Employee");

    if (!professionalPlan) {
      logStep("Professional Plan not found");
      throw new Error("Professional Plan not configured");
    }

    logStep("Found subscription tiers", { 
      professionalPlan: professionalPlan.stripe_price_id,
      employeePlan: employeePlan?.stripe_price_id 
    });

    // Create line items using actual Stripe price IDs
    const lineItems = [
      {
        price: professionalPlan.stripe_price_id,
        quantity: 1,
      }
    ];

    // Add employee seats if needed
    if (employeeSeats > 0) {
      if (!employeePlan) {
        logStep("Employee plan not found but employee seats needed");
        throw new Error("Employee plan not configured but employee seats are required");
      }
      
      lineItems.push({
        price: employeePlan.stripe_price_id,
        quantity: employeeSeats,
      });
    }

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "subscription",
      subscription_data: {
        metadata: {
          organization_id: org.id
        }
      },
      success_url: returnUrl ? `${returnUrl}?success=true` : `${req.headers.get("origin")}/?success=true`,
      cancel_url: returnUrl || `${req.headers.get("origin")}/subscription`,
      metadata: {
        organization_id: org.id,
        user_id: user.id,
        role: userRole.role,
        tier_id: tierData?.id || null
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
