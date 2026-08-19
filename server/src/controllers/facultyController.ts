import { Request, Response, NextFunction } from 'express';
import { FacultyModel } from '../models/Faculty.js';
import { sendSuccess } from '../utils/apiResponse.js';

export async function getAllFaculty(req: Request, res: Response, next: NextFunction) {
  try {
    const faculty = await FacultyModel.find();
    return sendSuccess(res, faculty, 'Faculty coordinators retrieved successfully');
  } catch (err) {
    return next(err);
  }
}
