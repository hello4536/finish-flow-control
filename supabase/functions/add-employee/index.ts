
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[ADD-EMPLOYEE] ${step}${detailsStr}`);
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
    if (userRole.role !== "admin") throw new Error("Only admin users can manage employee subscriptions");
    
    // Get organization details
    const { data: org, error: orgError } = await supabaseClient
      .from("organizations")
      .select("*")
      .eq("id", orgMember.organization_id)
      .single();
    
    if (orgError) throw new Error(`Organization error: ${orgError.message}`);
    
    logStep("Retrieved organization", { orgId: org.id, name: org.name });

    // Check if organization has a stripe customer ID
    if (!org.stripe_customer_id) {
      throw new Error("Organization does not have an active subscription");
    }
    
    // Initialize Stripe
    const stripe = new Stripe(stripeKey, { apiVersion: "2023-10-16" });
    
    // Get current subscriptions
    const subscriptions = await stripe.subscriptions.list({
      customer: org.stripe_customer_id,
      status: 'active',
      limit: 1,
    });
    
    if (subscriptions.data.length === 0) {
      throw new Error("No active subscription found");
    }
    
    const subscription = subscriptions.data[0];
    logStep("Found active subscription", { subscriptionId: subscription.id });
    
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
    
    logStep("Current organization stats", { 
      totalMembers: employeeCount, 
      adminUsers: adminCount,
      regularEmployees: employeeCount - adminCount
    });
    
    // Get the request data
    const requestData = await req.json();
    const { action } = requestData;
    
    if (!action || (action !== "add" && action !== "sync")) {
      throw new Error("Invalid action. Must be 'add' or 'sync'");
    }
    
    // Number of employee seats needed
    const employeeSeats = employeeCount - adminCount;
    
    // Find the employee subscription item
    const employeeItem = subscription.items.data.find(item => 
      item.price.id.includes("employee")
    );
    
    if (!employeeItem) {
      throw new Error("No employee subscription item found");
    }
    
    if (action === "add") {
      // Add one more employee seat
      await stripe.subscriptionItems.update(employeeItem.id, {
        quantity: employeeSeats + 1
      });
      
      logStep("Added one employee seat", { 
        newQuantity: employeeSeats + 1,
        subscriptionItemId: employeeItem.id
      });
    } else if (action === "sync") {
      // Sync the current number of employee seats
      await stripe.subscriptionItems.update(employeeItem.id, {
        quantity: employeeSeats
      });
      
      logStep("Synced employee seats", { 
        newQuantity: employeeSeats,
        subscriptionItemId: employeeItem.id
      });
    }
    
    return new Response(JSON.stringify({ 
      success: true,
      total_seats: employeeCount,
      admin_seats: adminCount,
      employee_seats: employeeSeats,
      action: action
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("[ADD-EMPLOYEE] Error:", errorMessage);
    
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
