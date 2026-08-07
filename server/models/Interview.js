import mongoose from 'mongoose';

const interviewSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  category: { 
    type: String, 
    required: true,
    enum: [
      'Software Engineer', 'Frontend', 'Backend', 'Full Stack', 'MERN',
      'React', 'Node.js', 'Express', 'MongoDB', 'Java', 'Python',
      'C++', 'Machine Learning', 'Data Science', 'DevOps', 'Cloud',
      'HR Interview', 'Behavioral Interview', 'System Design'
    ]
  },
  difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], default: 'Medium' },
  yearsOfExperience: { type: Number, default: 2 },
  company: { type: String, default: 'General' },
  jobRole: { type: String, default: 'Software Engineer' },
  durationMinutes: { type: Number, default: 15 },
  status: { type: String, enum: ['setup', 'in-progress', 'completed'], default: 'setup' },
  overallScore: { type: Number, default: 0 },
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],
  answers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Answer' }],
  reportId: { type: mongoose.Schema.Types.ObjectId, ref: 'Report' }
}, { timestamps: true });

export default mongoose.models.Interview || mongoose.model('Interview', interviewSchema);
