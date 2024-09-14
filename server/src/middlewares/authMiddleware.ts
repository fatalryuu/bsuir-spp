import { Request, Response, NextFunction } from 'express';
import authService from '../services/auth';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const accessToken = req.cookies.accessToken;

  if (!accessToken) {
    return res.status(401).json({ message: 'Access token missing in cookies' });
  }

  try {
    await authService.verifyAccessToken(accessToken);
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};
