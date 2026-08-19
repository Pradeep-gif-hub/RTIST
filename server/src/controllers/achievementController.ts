import { Request, Response, NextFunction } from 'express';
import { AchievementModel } from '../models/Achievement.js';
import { sendSuccess } from '../utils/apiResponse.js';

export async function getAllAchievements(req: Request, res: Response, next: NextFunction) {
  try {
    const achievements = await AchievementModel.find().sort({ year: -1 });
    return sendSuccess(res, achievements, 'Achievements retrieved successfully');
  } catch (err) {
    return next(err);
  }
}
