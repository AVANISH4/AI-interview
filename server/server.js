import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import os from 'os';

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

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Security & Middlewares
app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors({
  origin: '*', // Allow connections from any local device or IP
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Rate Limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 500,
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

// In-Memory Live Multi-Device Coding Session Store
const liveCodingRooms = {};

// Multi-Device Live Session Endpoints
app.get('/api/coding/room/:roomId', (req, res) => {
  const { roomId } = req.params;
  const room = liveCodingRooms[roomId] || {
    roomId,
    code: '',
    language: 'javascript',
    updatedAt: Date.now()
  };
  res.json({ success: true, room });
});

app.post('/api/coding/room/:roomId', (req, res) => {
  const { roomId } = req.params;
  const { code, language, workspaceMode } = req.body;
  
  liveCodingRooms[roomId] = {
    roomId,
    code: code || '',
    language: language || 'javascript',
    workspaceMode: workspaceMode || 'pure_ide',
    updatedAt: Date.now()
  };

  res.json({ success: true, room: liveCodingRooms[roomId] });
});

// Network IP Discovery Endpoint for Connecting 2 Devices on Local Browser / LAN
app.get('/api/network-ip', (req, res) => {
  const interfaces = os.networkInterfaces();
  let localIp = 'localhost';
  
  for (const name of Object.keys(interfaces)) {
    for (const net of interfaces[name]) {
      if (net.family === 'IPv4' && !net.internal) {
        localIp = net.address;
        break;
      }
    }
  }

  res.json({
    success: true,
    localIp,
    clientPort: 3000,
    serverPort: PORT,
    localUrl: `http://${localIp}:3000`
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

// Healthcheck API Route
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    app: 'AI Interview Pro API Engine',
    version: '1.0.0',
    timestamp: new Date()
  });
});

// Serve Client Static Build Files (Render Production Deployment)
const clientBuildPath = path.join(__dirname, '../client/dist');
if (fs.existsSync(clientBuildPath)) {
  app.use(express.static(clientBuildPath));
  app.get('*', (req, res) => {
    if (!req.path.startsWith('/api')) {
      res.sendFile(path.join(clientBuildPath, 'index.html'));
    }
  });
} else {
  app.get('/', (req, res) => {
    res.json({
      status: 'online',
      app: 'AI Interview Pro API Engine',
      version: '1.0.0',
      timestamp: new Date()
    });
  });
}

// Error Middleware
app.use(errorHandler);

// Listen on 0.0.0.0 to support local network connections from 2 different devices
app.listen(PORT, '0.0.0.0', () => {
  console.log(`AI Interview Pro Server active on http://localhost:${PORT} and binding 0.0.0.0`);
});
