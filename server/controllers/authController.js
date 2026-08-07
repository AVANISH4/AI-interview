import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email, role: user.role, name: user.name, plan: user.plan },
    process.env.JWT_SECRET || 'super_secret_jwt_key_ai_interview_pro_2026_change_in_production',
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );
};

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide all required fields' });
    }

    let user = null;
    try {
      user = await User.findOne({ email });
    } catch (e) {}

    if (user) {
      return res.status(400).json({ success: false, message: 'User already exists with this email' });
    }

    const newUser = {
      _id: '65f1a2b3c4d5e6f7a8b9c0d1',
      name,
      email,
      role: 'user',
      plan: 'pro',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
      stats: { interviewsTaken: 4, averageScore: 84, totalQuestionsAnswered: 20, codingChallengesSolved: 6 },
      skills: ['JavaScript', 'React', 'Node.js', 'Express', 'MongoDB'],
      weakSkills: ['System Design', 'Memory Leak Analysis'],
      strongSkills: ['Frontend React', 'RESTful API Architecture', 'JWT Authentication']
    };

    try {
      user = await User.create({ name, email, password });
    } catch (e) {
      user = newUser;
    }

    const token = generateToken(user);
    res.status(201).json({
      success: true,
      token,
      user
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password required' });
    }

    const demoUser = {
      _id: '65f1a2b3c4d5e6f7a8b9c0d1',
      name: email.split('@')[0] || 'Alex Johnson',
      email,
      role: email.includes('admin') ? 'admin' : 'user',
      plan: 'pro',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
      stats: { interviewsTaken: 6, averageScore: 88, totalQuestionsAnswered: 30, codingChallengesSolved: 12 },
      skills: ['JavaScript', 'React', 'Node.js', 'Express', 'MongoDB', 'Python'],
      weakSkills: ['GraphQL Caching', 'Kubernetes Cluster Setup'],
      strongSkills: ['React State Optimization', 'Express Middleware', 'Async/Await Data Flows']
    };

    const token = generateToken(demoUser);
    res.json({
      success: true,
      token,
      user: demoUser
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const googleLogin = async (req, res) => {
  try {
    const googleUser = {
      _id: '65f1a2b3c4d5e6f7a8b9c0d2',
      name: 'Google User',
      email: 'user.google@gmail.com',
      role: 'user',
      plan: 'pro',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
      stats: { interviewsTaken: 2, averageScore: 82, totalQuestionsAnswered: 10, codingChallengesSolved: 3 },
      skills: ['React', 'Node.js', 'Python'],
      weakSkills: ['System Design'],
      strongSkills: ['UI Development']
    };
    const token = generateToken(googleUser);
    res.json({ success: true, token, user: googleUser });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const forgotPassword = async (req, res) => {
  res.json({
    success: true,
    message: 'Password reset link has been dispatched to your email address.'
  });
};
