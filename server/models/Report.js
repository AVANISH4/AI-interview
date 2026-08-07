import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema({
  interviewId: { type: mongoose.Schema.Types.ObjectId, ref: 'Interview', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  overallScore: { type: Number, required: true },
  percentage: { type: Number, required: true },
  metrics: {
    communication: Number,
    confidence: Number,
    technicalKnowledge: Number,
    problemSolving: Number,
    vocabulary: Number,
    grammar: Number
  },
  detailedFeedback: { type: String },
  strengths: [{ type: String }],
  weaknesses: [{ type: String }],
  suggestions: [{ type: String }],
  pdfUrl: { type: String }
}, { timestamps: true });

export default mongoose.models.Report || mongoose.model('Report', reportSchema);
