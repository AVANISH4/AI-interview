import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  interviewId: { type: mongoose.Schema.Types.ObjectId, ref: 'Interview' },
  category: { type: String, required: true },
  difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], default: 'Medium' },
  questionText: { type: String, required: true },
  expectedKeywords: [{ type: String }],
  hint: { type: String },
  orderIndex: { type: Number, default: 0 },
  audioUrl: { type: String }
}, { timestamps: true });

export default mongoose.models.Question || mongoose.model('Question', questionSchema);
