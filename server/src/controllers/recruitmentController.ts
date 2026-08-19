import { Request, Response, NextFunction } from 'express';
import { RecruitmentModel } from '../models/Recruitment.js';
import { sendSuccess, sendError } from '../utils/apiResponse.js';

export async function submitApplication(req: Request, res: Response, next: NextFunction) {
  try {
    const {
      name,
      email,
      rollNumber,
      branch,
      year,
      areasOfInterest,
      technicalSkills,
      priorExperience,
      whyJoin,
      githubOrPortfolio,
    } = req.body;

    if (!name || !email || !rollNumber || !branch || !year || !whyJoin) {
      return sendError(res, 'Please fill in all mandatory candidate fields', 400);
    }

    const application = await RecruitmentModel.create({
      name,
      email,
      rollNumber,
      branch,
      year,
      areasOfInterest: areasOfInterest || [],
      technicalSkills,
      priorExperience,
      whyJoin,
      githubOrPortfolio,
      status: 'Pending',
    });

    return sendSuccess(
      res,
      application,
      'Candidate application registered successfully in RTIST database',
      201
    );
  } catch (err) {
    return next(err);
  }
}

export async function getAllApplications(_req: Request, res: Response, next: NextFunction) {
  try {
    const applications = await RecruitmentModel.find().sort({ createdAt: -1 });
    return sendSuccess(res, applications, 'Applications retrieved');
  } catch (err) {
    return next(err);
  }
}
