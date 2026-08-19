import { Router } from 'express';
import { getAllProjects, getProjectBySlug } from '../controllers/projectController.js';

const router = Router();

router.get('/', getAllProjects);
router.get('/:slug', getProjectBySlug);

export default router;
