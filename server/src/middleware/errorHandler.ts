import { Request, Response, NextFunction } from 'express';
import { sendError } from '../utils/apiResponse.js';

export function errorHandler(
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  console.error('[RTIST Server Error]:', err);

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Malfunction';

  return sendError(res, message, statusCode, err.errors);
}
