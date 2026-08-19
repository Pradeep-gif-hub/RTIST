import { Request, Response, NextFunction } from 'express';
import { TeamMemberModel } from '../models/TeamMember.js';
import { sendSuccess } from '../utils/apiResponse.js';

export async function getAllTeamMembers(req: Request, res: Response, next: NextFunction) {
  try {
    const { domain } = req.query;
    const filter: any = {};
    if (domain && domain !== 'All') filter.domain = domain;

    const members = await TeamMemberModel.find(filter);
    return sendSuccess(res, members, 'Team members retrieved successfully');
  } catch (err) {
    return next(err);
  }
}
