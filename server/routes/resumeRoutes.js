import express from 'express';
import multer from 'multer';
import { parseResume, generateResumeInterview } from '../controllers/resumeController.js';
import { protect } from '../middlewares/authMiddleware.js';

const upload = multer({ dest: 'uploads/' });
const router = express.Router();

router.post('/upload', protect, upload.single('resume'), parseResume);
router.post('/generate', protect, generateResumeInterview);

export default router;
