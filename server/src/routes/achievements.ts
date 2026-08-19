import { Router } from 'express';
import { getAllAchievements } from '../controllers/achievementController.js';

const router = Router();

router.get('/', getAllAchievements);

export default router;
