import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  stripeSessionId: { type: String },
  stripeCustomerId: { type: String },
  amount: { type: Number, required: true },
  currency: { type: String, default: 'usd' },
  plan: { type: String, enum: ['monthly', 'yearly', 'pro', 'enterprise'], required: true },
  status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'completed' },
  paymentMethod: { type: String, default: 'stripe' }
}, { timestamps: true });

export default mongoose.models.Payment || mongoose.model('Payment', paymentSchema);
