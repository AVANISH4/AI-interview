import { generateReportPDF } from '../services/pdfService.js';
import { sendEmailNotification } from '../services/emailService.js';

export const getReportById = async (req, res) => {
  const mockReport = {
    _id: req.params.id || 'rep_default',
    interviewId: 'int_101',
    overallScore: 86,
    percentage: 86,
    metrics: {
      communication: 88,
      confidence: 84,
      technicalKnowledge: 90,
      problemSolving: 82,
      vocabulary: 85,
      grammar: 92
    },
    detailedFeedback: 'Exceptional performance during the AI mock interview session. Demonstrated strong mastery over core JavaScript runtime mechanics, React fiber reconciliation, and Express backend routing.',
    strengths: [
      'Articulate technical vocabulary and concise explanations',
      'Solid grasp of asynchronous event loop microtask execution',
      'Structured approach to system scaling trade-offs'
    ],
    weaknesses: [
      'Could refine edge case mitigation strategies for distributed database lock contention'
    ],
    suggestions: [
      'Practice explaining two-phase commit protocols for microservice transactions',
      'Quantify previous project impact using STAR framework'
    ],
    createdAt: new Date()
  };

  res.json({ success: true, report: mockReport });
};

export const downloadReportPdf = async (req, res) => {
  try {
    const pdfData = await generateReportPDF({}, req.user?.name || 'Alex Johnson');
    res.setHeader('Content-Type', 'application/json');
    res.json({ success: true, pdfData, message: 'PDF generated successfully for download' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const emailReport = async (req, res) => {
  try {
    const { email } = req.body;
    const recipient = email || req.user?.email || 'alex.johnson@example.com';
    
    await sendEmailNotification({
      to: recipient,
      subject: 'Your AI Interview Pro Performance Report',
      htmlText: `<h2>AI Interview Pro Evaluation</h2><p>Your performance report overall score is 86%.</p>`
    });

    res.json({ success: true, message: `Report has been emailed to ${recipient}` });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
