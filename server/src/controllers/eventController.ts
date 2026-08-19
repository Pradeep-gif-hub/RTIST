import { Request, Response, NextFunction } from 'express';
import { EventModel } from '../models/Event.js';
import { sendSuccess, sendError } from '../utils/apiResponse.js';

export async function getAllEvents(req: Request, res: Response, next: NextFunction) {
  try {
    const { isPast, category } = req.query;
    const filter: any = {};
    if (isPast !== undefined) filter.isPast = isPast === 'true';
    if (category && category !== 'All') filter.category = category;

    const events = await EventModel.find(filter).sort({ date: 1 });
    return sendSuccess(res, events, 'Events retrieved successfully');
  } catch (err) {
    return next(err);
  }
}

export async function getEventBySlug(req: Request, res: Response, next: NextFunction) {
  try {
    const { slug } = req.params;
    const event = await EventModel.findOne({ slug });
    if (!event) {
      return sendError(res, 'Event not found in tournament schedule', 404);
    }
    return sendSuccess(res, event, 'Event retrieved successfully');
  } catch (err) {
    return next(err);
  }
}
