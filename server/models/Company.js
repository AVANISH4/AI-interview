import mongoose from 'mongoose';

const companySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  slug: { type: String, required: true, unique: true },
  logo: { type: String },
  tagline: { type: String },
  popularRoles: [{ type: String }],
  questionCategories: [{ type: String }],
  description: { type: String },
  difficultyDistribution: {
    easy: Number,
    medium: Number,
    hard: Number
  }
}, { timestamps: true });

export default mongoose.models.Company || mongoose.model('Company', companySchema);
