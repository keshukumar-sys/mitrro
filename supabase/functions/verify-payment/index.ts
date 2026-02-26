import { serve } from "https://deno.land/std@0.177.0/http/server.ts";

// Use node:crypto for Deno bundler
import * as crypto from "node:crypto";

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  }

  try {
    const body = await req.json();
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = body;

    if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { "Access-Control-Allow-Origin": "*" } }
      );
    }

    // Razorpay secret
    const key_secret = Deno.env.get("RAZORPAY_KEY_SECRET")!;

    // Verify signature
    const generated_signature = crypto
      .createHmac("sha256", key_secret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (generated_signature !== razorpay_signature) {
      return new Response(
        JSON.stringify({ success: false, error: "Invalid signature" }),
        { status: 400, headers: { "Access-Control-Allow-Origin": "*" } }
      );
    }

    // Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const { createClient } = await import(
      "https://esm.sh/@supabase/supabase-js"
    );
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Update order payment status
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .update({
        payment_id: razorpay_payment_id,
        payment_status: "paid",
        status: "confirmed",
      })
      .eq("razorpay_order_id", razorpay_order_id)
      .select()
      .single();

    if (orderError) throw orderError;

    return new Response(
      JSON.stringify({ success: true, order }),
      { status: 200, headers: { "Access-Control-Allow-Origin": "*" } }
    );

  } catch (err: any) {
    return new Response(
      JSON.stringify({ success: false, error: err.message }),
      { status: 500, headers: { "Access-Control-Allow-Origin": "*" } }
    );
  }
});
