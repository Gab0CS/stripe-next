import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/utils/stripe/stripe";
import { supabaseAdmin } from "@/utils/supabase/server";
import Stripe from "stripe";

export async function POST(request: NextRequest) {
    try {
        // Validate that webhook comes from my stripe
        const rawBody = await request.text();
        const signature = request.headers.get('stripe-signature');

        let event;
        try {
            event = stripe.webhooks.constructEvent(rawBody, signature!, process.env.STRIPE_WEBHOOK_SECRET!);
        } catch (error:any) {
            console.error(`Webhook signature verification failed: ${error.message}`);
            return NextResponse.json({ message: 'webhook error'}, { status: 400 });
        }

        //If request is valid
        if(event.type === 'checkout.session.completed'){
            const session: Stripe.Checkout.Session = event.data.object;
            console.log(session);
            const userId = session.metadata?.user_id

            //Update or create stripe_customer in supabase
            const { error } = await supabaseAdmin
            .from('stripe_customer')
            .upsert({
                user_id: userId,
                stripe_customer_id: session.customer,
                subscription_id: session.subscription,
                plan_active: true,
                plan_expires: null
            })
        }

        return NextResponse.json({ message: 'success'});
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 })
    }
}







