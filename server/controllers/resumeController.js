import { parseResumeSkills, generateInterviewQuestions } from '../services/aiService.js';

export const parseResume = async (req, res) => {
  try {
    const resumeText = req.body?.resumeText || (req.file ? req.file.originalname : '');
    const result = await parseResumeSkills(resumeText || 'React Node.js Express MongoDB TypeScript Python');

    res.json({
      success: true,
      extractedSkills: result.extractedSkills || [],
      recommendedRole: result.detectedRole || 'Full Stack MERN Engineer',
      recommendedCategory: result.suggestedCategory || 'Full Stack',
      experienceYears: result.experienceYears || 2,
      message: 'Resume parsed successfully! Target role & skills extracted.'
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const generateResumeInterview = async (req, res) => {
  try {
    const { skills, jobRole, category, yearsOfExperience, company } = req.body;

    const selectedCategory = category || 'Full Stack';
    const selectedRole = jobRole || 'Software Engineer';
    const exp = Number(yearsOfExperience) || 3;
    const selectedCompany = company || 'Top Tech Enterprise';

    const questions = await generateInterviewQuestions({
      category: selectedCategory,
      difficulty: exp >= 5 ? 'Hard' : 'Medium',
      yearsOfExperience: exp,
      company: selectedCompany,
      jobRole: selectedRole,
      count: 5
    });

    res.json({
      success: true,
      interview: {
        _id: 'int_res_' + Date.now(),
        title: `Resume AI Interview: ${selectedRole}`,
        category: selectedCategory,
        company: selectedCompany,
        jobRole: selectedRole,
        difficulty: exp >= 5 ? 'Hard' : 'Medium',
        status: 'in-progress',
        questions: questions.map((q, idx) => ({
          _id: 'q_res_' + idx,
          questionText: q.questionText,
          hint: q.hint,
          expectedKeywords: q.expectedKeywords,
          orderIndex: idx
        }))
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
