import express from 'express';
import { createCheckoutSession, getSubscriptionStatus } from '../controllers/paymentController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/create-checkout-session', protect, createCheckoutSession);
router.get('/status', protect, getSubscriptionStatus);

export default router;
