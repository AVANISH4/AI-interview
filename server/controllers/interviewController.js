import { generateInterviewQuestions, evaluateInterviewSession } from '../services/aiService.js';

export const createInterview = async (req, res) => {
  try {
    const { category, difficulty, yearsOfExperience, company, jobRole, durationMinutes } = req.body;
    
    const questionsData = await generateInterviewQuestions({
      category: category || 'Software Engineer',
      difficulty: difficulty || 'Medium',
      yearsOfExperience: yearsOfExperience || 2,
      company: company || 'General Tech',
      jobRole: jobRole || 'Software Engineer',
      count: 5
    });

    const mockInterview = {
      _id: 'int_' + Date.now(),
      title: `${category || 'Software Engineer'} Mock Interview (${difficulty || 'Medium'})`,
      category: category || 'Software Engineer',
      difficulty: difficulty || 'Medium',
      yearsOfExperience: yearsOfExperience || 2,
      company: company || 'General',
      jobRole: jobRole || 'Software Engineer',
      durationMinutes: durationMinutes || 15,
      status: 'in-progress',
      createdAt: new Date(),
      questions: questionsData.map((q, idx) => ({
        _id: 'q_' + idx,
        questionText: q.questionText,
        hint: q.hint,
        expectedKeywords: q.expectedKeywords,
        orderIndex: idx
      }))
    };

    res.status(201).json({ success: true, interview: mockInterview });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const submitInterviewAnswers = async (req, res) => {
  try {
    const { interviewId, category, questions, answers } = req.body;
    const evaluation = await evaluateInterviewSession({ category: category || 'Software Engineer', questions, answers });

    const report = {
      _id: 'rep_' + Date.now(),
      interviewId,
      overallScore: evaluation.overallScore,
      percentage: evaluation.percentage,
      metrics: evaluation.metrics,
      detailedFeedback: evaluation.detailedFeedback,
      strengths: evaluation.strengths,
      weaknesses: evaluation.weaknesses,
      suggestions: evaluation.suggestions,
      createdAt: new Date()
    };

    res.json({ success: true, report });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getUserInterviews = async (req, res) => {
  const history = [
    { _id: 'int_101', title: 'Frontend Developer Mock Interview', category: 'Frontend', difficulty: 'Hard', company: 'Google', overallScore: 88, status: 'completed', createdAt: new Date(Date.now() - 86400000 * 2) },
    { _id: 'int_102', title: 'Full Stack MERN Technical Interview', category: 'MERN', difficulty: 'Medium', company: 'Amazon', overallScore: 82, status: 'completed', createdAt: new Date(Date.now() - 86400000 * 5) },
    { _id: 'int_103', title: 'System Design Interview', category: 'System Design', difficulty: 'Hard', company: 'Meta', overallScore: 76, status: 'completed', createdAt: new Date(Date.now() - 86400000 * 8) }
  ];
  res.json({ success: true, interviews: history });
};
