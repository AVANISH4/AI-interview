import express from 'express';
import { runCode, submitCode, getCodingChallenges } from '../controllers/codingController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/challenges', getCodingChallenges);
router.post('/run', protect, runCode);
router.post('/submit', protect, submitCode);

export default router;
