
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(
      null,
      {
        headers: {
          ...corsHeaders,
          "Access-Control-Allow-Methods": "POST, OPTIONS",
        },
        status: 204,
      },
    );
  }

  try {
    // Create a Supabase client with the service role key (bypasses RLS)
    const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
    
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
    
    // Get request body
    const { userId, orgName } = await req.json();
    
    if (!userId || !orgName) {
      return new Response(
        JSON.stringify({ error: "userId and orgName are required" }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 400,
        },
      );
    }

    // Create organization
    const { data: orgData, error: orgError } = await supabaseAdmin
      .from("organizations")
      .insert([{ name: orgName }])
      .select()
      .single();

    if (orgError) {
      console.error("Error creating organization:", orgError);
      throw orgError;
    }

    // Add user to organization
    const { error: memberError } = await supabaseAdmin
      .from("org_members")
      .insert([{ 
        organization_id: orgData.id, 
        user_id: userId 
      }]);

    if (memberError) {
      console.error("Error adding user to organization:", memberError);
      throw memberError;
    }

    // Set user as admin
    const { error: roleError } = await supabaseAdmin
      .from("user_roles")
      .insert([{ 
        user_id: userId,
        role: "admin"
      }]);

    if (roleError) {
      console.error("Error setting user role:", roleError);
      throw roleError;
    }

    return new Response(
      JSON.stringify({ success: true, organizationId: orgData.id }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      },
    );
  } catch (error) {
    console.error("Error:", error.message);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      },
    );
  }
});
