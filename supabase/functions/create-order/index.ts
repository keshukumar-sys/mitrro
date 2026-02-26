// @ts-ignore: Razorpay types not included in Deno
import Razorpay from "razorpay";
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";

serve(async (req) => {
  // Handle preflight CORS request
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: {
        "Access-Control-Allow-Origin": "*", // replace "*" with your frontend URL in production
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  }

  try {
    const body = await req.json();
    const {
      amount,
      user_id,
      customer_name,
      customer_email,
      customer_phone,
      shipping_address,
    } = body;

    if (!amount) {
      return new Response(
        JSON.stringify({ error: "Amount is required" }),
        { status: 400, headers: { "Access-Control-Allow-Origin": "*" } }
      );
    }

    // Razorpay secrets
    const key_id = Deno.env.get("RAZORPAY_KEY_ID")!;
    const key_secret = Deno.env.get("RAZORPAY_KEY_SECRET")!;

    const razorpay = new Razorpay({ key_id, key_secret });

    // Create Razorpay order (amount in paise)
    const order = await razorpay.orders.create({
      amount: amount * 100,
      currency: "INR",
    });

    // Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const { createClient } = await import(
      "https://esm.sh/@supabase/supabase-js"
    );
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Insert order in Supabase
    const { data, error } = await supabase
      .from("orders")
      .insert({
        user_id,
        customer_name,
        customer_email,
        customer_phone,
        shipping_address,
        total_amount: amount,
        razorpay_order_id: order.id,
        status: "pending",
        payment_status: "pending",
        payment_method: "razorpay",
      })
      .select()
      .single();

    if (error) throw error;

    return new Response(
      JSON.stringify({ success: true, order, orderRecord: data }),
      {
        status: 200,
        headers: { "Access-Control-Allow-Origin": "*" },
      }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500, headers: { "Access-Control-Allow-Origin": "*" } }
    );
  }
});
