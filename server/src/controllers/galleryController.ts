import { Request, Response, NextFunction } from 'express';
import { GalleryItemModel } from '../models/GalleryItem.js';
import { sendSuccess } from '../utils/apiResponse.js';

export async function getAllGalleryItems(req: Request, res: Response, next: NextFunction) {
  try {
    const { category, limit = 50, page = 1 } = req.query;
    const filter: any = {};
    if (category && category !== 'All') filter.category = category;

    const skip = (Number(page) - 1) * Number(limit);
    const items = await GalleryItemModel.find(filter)
      .sort({ date: -1 })
      .skip(skip)
      .limit(Number(limit));

    return sendSuccess(res, items, 'Gallery items retrieved successfully');
  } catch (err) {
    return next(err);
  }
}
