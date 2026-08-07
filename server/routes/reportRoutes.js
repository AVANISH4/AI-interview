import express from 'express';
import { getReportById, downloadReportPdf, emailReport } from '../controllers/reportController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/:id', protect, getReportById);
router.get('/:id/download', protect, downloadReportPdf);
router.post('/:id/email', protect, emailReport);

export default router;
