import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import interviewRoutes from './routes/interviewRoutes.js';
import reportRoutes from './routes/reportRoutes.js';
import companyRoutes from './routes/companyRoutes.js';
import resumeRoutes from './routes/resumeRoutes.js';
import codingRoutes from './routes/codingRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import { errorHandler } from './middlewares/errorMiddleware.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Security & Middlewares
app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors({
  origin: process.env.CLIENT_URL || '*',
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Rate Limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  message: { success: false, message: 'Too many requests from this IP, please try again later.' }
});
app.use('/api', limiter);

// MongoDB Database Connection
if (process.env.MONGO_URI) {
  mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Atlas Connected Successfully!'))
    .catch(err => console.warn('MongoDB connection error, running in stateless dev mode:', err.message));
} else {
  console.log('No MONGO_URI provided in environment. Running backend in stateless dev fallback mode.');
}

// Healthcheck Route
app.get('/', (req, res) => {
  res.json({
    status: 'online',
    app: 'AI Interview Pro API Engine',
    version: '1.0.0',
    timestamp: new Date()
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/interviews', interviewRoutes);
app.use('/api/questions', interviewRoutes);
app.use('/api/answers', interviewRoutes);
app.use('/api/report', reportRoutes);
app.use('/api/company', companyRoutes);
app.use('/api/resume', resumeRoutes);
app.use('/api/coding', codingRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/admin', adminRoutes);

// Error Middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`AI Interview Pro Server active on http://localhost:${PORT}`);
});
