import Stripe from 'stripe';

let stripeClient = null;
if (process.env.STRIPE_SECRET_KEY) {
  stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY);
}

export const createCheckoutSession = async (req, res) => {
  try {
    const { plan, billingCycle } = req.body;
    const amount = billingCycle === 'yearly' ? 14900 : 1900; // in cents ($149 or $19)

    if (stripeClient) {
      const session = await stripeClient.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [{
          price_data: {
            currency: 'usd',
            product_data: {
              name: `AI Interview Pro ${plan.toUpperCase()} Plan (${billingCycle})`,
              description: 'Unlimited AI Voice Interviews, Custom Resume Scanning, & Monaco Coding Sandbox'
            },
            unit_amount: amount
          },
          quantity: 1
        }],
        mode: 'subscription',
        success_url: `${process.env.CLIENT_URL || 'http://localhost:5173'}/dashboard?payment=success`,
        cancel_url: `${process.env.CLIENT_URL || 'http://localhost:5173'}/pricing?payment=cancel`
      });

      return res.json({ success: true, url: session.url, sessionId: session.id });
    }

    // Mock payment response for local dev preview
    res.json({
      success: true,
      url: `${process.env.CLIENT_URL || 'http://localhost:5173'}/dashboard?payment=simulated_success`,
      message: 'Simulated payment checkout created! Plan upgraded.'
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getSubscriptionStatus = async (req, res) => {
  res.json({
    success: true,
    plan: req.user?.plan || 'pro',
    status: 'active',
    billingPeriod: 'monthly',
    nextBillingDate: new Date(Date.now() + 86400000 * 30)
  });
};
