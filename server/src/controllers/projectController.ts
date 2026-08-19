import { Request, Response, NextFunction } from 'express';
import { ProjectModel } from '../models/Project.js';
import { sendSuccess, sendError } from '../utils/apiResponse.js';

export async function getAllProjects(req: Request, res: Response, next: NextFunction) {
  try {
    const { category, featured } = req.query;
    const filter: any = {};
    if (category && category !== 'All') filter.category = category;
    if (featured === 'true') filter.featured = true;

    const projects = await ProjectModel.find(filter).sort({ year: -1 });
    return sendSuccess(res, projects, 'Projects retrieved successfully');
  } catch (err) {
    return next(err);
  }
}

export async function getProjectBySlug(req: Request, res: Response, next: NextFunction) {
  try {
    const { slug } = req.params;
    const project = await ProjectModel.findOne({ slug });
    if (!project) {
      return sendError(res, 'Project build spec not found', 404);
    }
    return sendSuccess(res, project, 'Project retrieved successfully');
  } catch (err) {
    return next(err);
  }
}
