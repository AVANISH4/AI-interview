import { parseResumeSkills, generateInterviewQuestions } from '../services/aiService.js';

export const parseResume = async (req, res) => {
  try {
    const resumeText = req.body?.resumeText || (req.file ? req.file.originalname : '');
    const extractedSkills = await parseResumeSkills(resumeText || 'React Node.js Express MongoDB TypeScript Python');

    res.json({
      success: true,
      extractedSkills,
      recommendedRole: 'Full Stack MERN Developer',
      recommendedCategory: 'MERN',
      message: 'Resume parsed successfully! Tailored interview questions prepared.'
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const generateResumeInterview = async (req, res) => {
  try {
    const { skills, jobRole } = req.body;
    const questions = await generateInterviewQuestions({
      category: 'Full Stack',
      difficulty: 'Medium',
      yearsOfExperience: 3,
      jobRole: jobRole || 'Full Stack Engineer',
      count: 5
    });

    res.json({
      success: true,
      interview: {
        _id: 'int_res_' + Date.now(),
        title: `Resume-Based AI Interview (${(skills || []).join(', ') || 'Custom'})`,
        category: 'Full Stack',
        difficulty: 'Medium',
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
