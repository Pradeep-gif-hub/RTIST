import { Request, Response, NextFunction } from 'express';
import { DocArticleModel } from '../models/DocArticle.js';
import { sendSuccess, sendError } from '../utils/apiResponse.js';

export async function getAllDocArticles(req: Request, res: Response, next: NextFunction) {
  try {
    const { category } = req.query;
    const filter: any = {};
    if (category && category !== 'All') filter.category = category;

    const docs = await DocArticleModel.find(filter);
    return sendSuccess(res, docs, 'Documentation articles retrieved successfully');
  } catch (err) {
    return next(err);
  }
}

export async function getDocArticleBySlug(req: Request, res: Response, next: NextFunction) {
  try {
    const { categorySlug, slug } = req.params;
    const doc = await DocArticleModel.findOne({ categorySlug, slug });
    if (!doc) {
      return sendError(res, 'Documentation article not found', 404);
    }
    return sendSuccess(res, doc, 'Documentation article retrieved successfully');
  } catch (err) {
    return next(err);
  }
}
