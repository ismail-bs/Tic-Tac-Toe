import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

// Extend the Express Request type to include `user`
export interface AuthenticatedRequest extends Request {
  user?: any;
}

export const authenticateJWT = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
  const token = req.header('Authorization')?.split(' ')[1];
  
  if (!token) {
    res.status(403).json({ error: 'Access denied' });
    return; // Ensure the function exits
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
};
