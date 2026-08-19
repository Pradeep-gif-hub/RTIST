import { Router } from 'express';
import { getAllDocArticles, getDocArticleBySlug } from '../controllers/docController.js';

const router = Router();

router.get('/', getAllDocArticles);
router.get('/:categorySlug/:slug', getDocArticleBySlug);

export default router;
