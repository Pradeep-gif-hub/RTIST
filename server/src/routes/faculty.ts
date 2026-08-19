import { Router } from 'express';
import { getAllFaculty } from '../controllers/facultyController.js';

const router = Router();

router.get('/', getAllFaculty);

export default router;
