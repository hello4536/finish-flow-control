
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    )

    const { email, finisherType } = await req.json()

    if (!email || !finisherType) {
      return new Response(
        JSON.stringify({ error: 'Email and finisher type are required' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Check if email already exists
    const { data: existingSubscriber } = await supabaseClient
      .from('newsletter_subscribers')
      .select('*')
      .eq('email', email)
      .single()

    if (existingSubscriber) {
      // Update existing subscription
      const { data, error } = await supabaseClient
        .from('newsletter_subscribers')
        .update({ 
          subscription_type: finisherType,
          status: 'confirmed',
          updated_at: new Date().toISOString()
        })
        .eq('email', email)
        .select()
        .single()

      if (error) throw error

      return new Response(
        JSON.stringify({ 
          message: 'Subscription updated successfully',
          subscriber: data
        }),
        { 
          status: 200, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    } else {
      // Create new subscription
      const { data, error } = await supabaseClient
        .from('newsletter_subscribers')
        .insert({
          email,
          subscription_type: finisherType,
          status: 'confirmed',
          confirmation_token: crypto.randomUUID(),
        })
        .select()
        .single()

      if (error) throw error

      return new Response(
        JSON.stringify({ 
          message: 'Successfully subscribed to newsletter',
          subscriber: data
        }),
        { 
          status: 201, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

  } catch (error) {
    console.error('Newsletter subscription error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})
