import express from 'express';
import { createInterview, submitInterviewAnswers, getUserInterviews } from '../controllers/interviewController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/setup', protect, createInterview);
router.post('/submit', protect, submitInterviewAnswers);
router.get('/history', protect, getUserInterviews);

export default router;
