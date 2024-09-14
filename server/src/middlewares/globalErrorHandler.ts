import { NextFunction, Request, Response } from 'express';

export const globalErrorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('[global error handler]:', err);
  return res.status(500).json({ error: 'Internal server error' });
};
