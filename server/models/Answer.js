import mongoose from 'mongoose';

const answerSchema = new mongoose.Schema({
  interviewId: { type: mongoose.Schema.Types.ObjectId, ref: 'Interview', required: true },
  questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  userTranscript: { type: String, default: '' },
  timeTakenSeconds: { type: Number, default: 0 },
  skipped: { type: Boolean, default: false },
  feedback: {
    communication: { type: Number, default: 0 },
    confidence: { type: Number, default: 0 },
    technicalKnowledge: { type: Number, default: 0 },
    problemSolving: { type: Number, default: 0 },
    vocabulary: { type: Number, default: 0 },
    grammar: { type: Number, default: 0 },
    score: { type: Number, default: 0 },
    suggestions: [String]
  }
}, { timestamps: true });

export default mongoose.models.Answer || mongoose.model('Answer', answerSchema);
