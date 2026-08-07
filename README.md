# AI Interview Pro - Modern Production-Ready MERN Stack AI Mock Interview Platform

**AI Interview Pro** is an end-to-end AI-powered mock interview platform built on the MERN stack (MongoDB, Express.js, React.js, Node.js). It empowers candidates to practice technical and HR interviews using real-time **AI Voice Assistant (Speech-to-Text & Text-to-Speech)**, live **Monaco Coding Sandbox**, **Resume Skill Extraction**, **Company-Specific Tracks** (Google, Amazon, Meta, Netflix, OpenAI), **6-Point Radar Metrics**, and **Stripe Membership Billing**.

---

## 🚀 Key Features

1. **Authentication System**: JWT Token authentication, Password hashing via `bcryptjs`, Google OAuth integration, Forgot Password reset workflow.
2. **Interactive AI Dashboard**: Candidate welcome, metrics overview, interview statistics, performance graph (Recharts), weak & strong skill breakdown, recent session history.
3. **18 Interview Categories**: Software Engineer, Frontend, Backend, Full Stack, MERN, React, Node.js, Express, MongoDB, Java, Python, C++, Machine Learning, Data Science, DevOps, Cloud, HR, Behavioral, System Design.
4. **Custom Difficulty & Experience Setup**: Easy, Medium, Hard difficulty tiers, experience levels (0-1, 1-3, 3-5, 5+ yrs), target company, and session duration.
5. **AI Voice Interview Room**:
   - Voice Synthesis (Text-to-Speech) asks questions dynamically.
   - Microphone Speech-to-Text converts candidate responses into live transcripts.
   - Timer countdown per question with Skip, Repeat, and End controls.
6. **AI Radar Evaluation & Analytics**: Calculates Communication, Confidence, Technical Knowledge, Problem Solving, Vocabulary, and Grammar scores alongside detailed strengths, weaknesses, and actionable suggestions.
7. **AI PDF Report Generator**: Printable PDF performance reports with download and email dispatch actions.
8. **Resume Skill Scanner**: Upload resume text/file to extract core skills and auto-generate personalized interview rounds.
9. **Company-Specific Tracks**: Tailored rounds for Google, Amazon, Microsoft, Meta, Netflix, Adobe, Apple, Uber, LinkedIn, and OpenAI.
10. **Integrated Monaco Coding Editor**: Multi-language support (JavaScript, Python, C++, Java) with test case execution, time/memory stats, and AI complexity analysis.
11. **Admin Control Panel**: Manage platform users, delete users, track total revenue, and inspect monthly growth metrics.
12. **Stripe Integration**: Checkout session creation for Monthly and Yearly Pro subscription tiers.
13. **Leaderboard & Gamification**: Candidate rankings, points, achievements, and badges.

---

## 🛠️ Tech Stack

- **Frontend**: React.js (Vite), Tailwind CSS, Framer Motion, Recharts, `@monaco-editor/react`, Lucide Icons, Axios.
- **Backend**: Node.js, Express.js, Mongoose, JWT, Helmet, Express Rate Limit, Multer, Nodemailer, Stripe SDK, OpenAI SDK.
- **Database**: MongoDB Atlas / Mongoose ORM (with dev fallback mode).

---

## 📂 Folder Structure

```
AI-Interview/
├── client/                 # React Vite Frontend
│   ├── src/
│   │   ├── components/     # Reusable UI (Navbar, Sidebar, Toast)
│   │   ├── context/        # AuthContext, ThemeContext
│   │   ├── hooks/          # useSpeech custom hook
│   │   ├── layouts/        # MainLayout, DashboardLayout
│   │   ├── pages/          # All 16 Platform Pages
│   │   ├── services/       # Axios API client
│   │   ├── index.css       # Tailwind CSS & Glassmorphism styles
│   │   ├── App.jsx         # Router Config
│   │   └── main.jsx        # App Entrypoint
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
│
├── server/                 # Node + Express Backend
│   ├── config/             # DB & Config helpers
│   ├── controllers/        # Express Controllers (Auth, Interview, Coding, Admin, etc.)
│   ├── middlewares/        # Auth JWT & Error handler
│   ├── models/             # Mongoose Schemas (User, Interview, Question, Report, etc.)
│   ├── routes/             # Express API Routes
│   ├── services/           # AI Service, PDF Service, Email Service
│   ├── .env.example
│   ├── package.json
│   └── server.js           # Server Entrypoint
└── README.md
```

---

## ⚡ Quick Setup & Installation

### 1. Backend Setup

```bash
cd server
npm install
npm run dev
```

The server will run on `http://localhost:5000`.

### 2. Frontend Setup

In a new terminal:

```bash
cd client
npm install
npm run dev
```

The client application will run on `http://localhost:5173`.

---

## 🔐 Environment Variables (`server/.env`)

```env
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/ai_interview_pro
JWT_SECRET=super_secret_jwt_key_ai_interview_pro_2026
OPENAI_API_KEY=sk-proj-your-openai-key
STRIPE_SECRET_KEY=sk_test_your_stripe_key
```

*(Note: If MongoDB, OpenAI, or Stripe keys are omitted, the backend activates intelligent offline fallback modes to ensure full interactive functionality during development).*
