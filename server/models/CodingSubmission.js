import mongoose from 'mongoose';

const codingSubmissionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  language: { type: String, enum: ['javascript', 'python', 'cpp', 'java'], required: true },
  code: { type: String, required: true },
  passed: { type: Boolean, default: false },
  executionTimeMs: { type: Number, default: 0 },
  memoryUsageMb: { type: Number, default: 0 },
  testResults: [{
    input: String,
    expectedOutput: String,
    actualOutput: String,
    passed: Boolean
  }],
  aiFeedback: {
    timeComplexity: String,
    spaceComplexity: String,
    codeQuality: String,
    optimizationTips: [String],
    alternativeSolution: String
  }
}, { timestamps: true });

export default mongoose.models.CodingSubmission || mongoose.model('CodingSubmission', codingSubmissionSchema);
