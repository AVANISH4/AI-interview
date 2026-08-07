import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, select: false },
  googleId: { type: String },
  avatar: { type: String, default: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80' },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  plan: { type: String, enum: ['free', 'pro', 'enterprise'], default: 'free' },
  subscriptionEndDate: { type: Date },
  skills: [{ type: String }],
  experience: [{
    title: String,
    company: String,
    duration: String,
    description: String
  }],
  education: [{
    degree: String,
    institution: String,
    year: String
  }],
  certificates: [{
    title: String,
    issuer: String,
    date: String
  }],
  resumeUrl: { type: String },
  resumeText: { type: String },
  stats: {
    interviewsTaken: { type: Number, default: 0 },
    averageScore: { type: Number, default: 0 },
    totalQuestionsAnswered: { type: Number, default: 0 },
    codingChallengesSolved: { type: Number, default: 0 }
  },
  weakSkills: [{ type: String }],
  strongSkills: [{ type: String }],
  bookmarks: [{ type: String }], // Question IDs or content
  favoriteInterviews: [{ type: String }],
  achievements: [{
    id: String,
    title: String,
    description: String,
    unlockedAt: { type: Date, default: Date.now },
    badgeIcon: String
  }],
  points: { type: Number, default: 100 }
}, { timestamps: true });

export default mongoose.models.User || mongoose.model('User', userSchema);
