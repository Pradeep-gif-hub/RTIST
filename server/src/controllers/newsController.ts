import { Request, Response, NextFunction } from 'express';
import { NewsModel } from '../models/News.js';
import { sendSuccess, sendError } from '../utils/apiResponse.js';

export async function getAllNews(req: Request, res: Response, next: NextFunction) {
  try {
    const news = await NewsModel.find().sort({ publishedAt: -1 });
    return sendSuccess(res, news, 'News items retrieved successfully');
  } catch (err) {
    return next(err);
  }
}

export async function getNewsBySlug(req: Request, res: Response, next: NextFunction) {
  try {
    const { slug } = req.params;
    const article = await NewsModel.findOne({ slug });
    if (!article) {
      return sendError(res, 'News dispatch not found', 404);
    }
    return sendSuccess(res, article, 'News dispatch retrieved successfully');
  } catch (err) {
    return next(err);
  }
}
