import express from 'express';
import { getCompanies, getCompanyDetails } from '../controllers/companyController.js';

const router = express.Router();

router.get('/', getCompanies);
router.get('/:slug', getCompanyDetails);

export default router;
