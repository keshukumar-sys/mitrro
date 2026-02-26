// Supabase Edge Function: submit-brand-inquiry
// Inserts a public brand inquiry using the service role (bypasses RLS) after minimal validation.
// This is safe for public forms because we only allow inserts of non-sensitive fields.

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error("Missing Supabase environment variables");
}

const adminClient = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function sanitize(input: unknown, max = 1000) {
  if (typeof input !== "string") return "";
  return input.trim().slice(0, max);
}

export const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: { ...corsHeaders } });
  }

  try {
    const body = await req.json().catch(() => ({}));

    const brand_name = sanitize(body.brand_name, 120);
    const customer_name = sanitize(body.customer_name, 100);
    const customer_email = sanitize(body.customer_email, 255);
    const customer_phone = sanitize(body.customer_phone, 30);
    const inquiry_message = sanitize(body.inquiry_message, 1000);

    if (!brand_name || !customer_name || !customer_email || !inquiry_message) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        headers: { "content-type": "application/json", ...corsHeaders },
      });
    }

    if (!isValidEmail(customer_email)) {
      return new Response(JSON.stringify({ error: "Invalid email" }), {
        status: 400,
        headers: { "content-type": "application/json", ...corsHeaders },
      });
    }

    const { data, error } = await adminClient
      .from("brand_inquiries")
      .insert({
        brand_name,
        customer_name,
        customer_email,
        customer_phone: customer_phone || null,
        inquiry_message,
      })
      .select()
      .single();

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 400,
        headers: { "content-type": "application/json", ...corsHeaders },
      });
    }

    return new Response(JSON.stringify({ data }), {
      status: 200,
      headers: { "content-type": "application/json", ...corsHeaders },
    });
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : "Unknown error";
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { "content-type": "application/json", ...corsHeaders },
    });
  }
});
