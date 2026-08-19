import { Router } from 'express';
import { submitApplication, getAllApplications } from '../controllers/recruitmentController.js';

const router = Router();

router.post('/', submitApplication);
router.get('/', getAllApplications);

export default router;
