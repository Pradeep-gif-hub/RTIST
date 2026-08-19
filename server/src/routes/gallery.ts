import { Router } from 'express';
import { getAllGalleryItems } from '../controllers/galleryController.js';

const router = Router();

router.get('/', getAllGalleryItems);

export default router;
