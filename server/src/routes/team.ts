import { Router } from 'express';
import { getAllTeamMembers } from '../controllers/teamController.js';

const router = Router();

router.get('/', getAllTeamMembers);

export default router;
