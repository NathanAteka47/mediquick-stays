import { Request, Response, NextFunction } from 'express';
import { TokenService } from '../services/tokenService';
import { AuthRequest } from '../types';
import jwt from 'jsonwebtoken';
import { AppError } from './errorHandler';

export const auth = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. No token provided.'
      });
    }

    const decoded = TokenService.verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Invalid token.'
    });
  }
};

// export const adminAuth = (req: AuthRequest, res: Response, next: NextFunction) => {
//   auth(req, res, () => {
//     if (req.user?.role !== 'admin') {
//       return res.status(403).json({
//         success: false,
//         message: 'Access denied. Admin role required.'
//       });
//     }
//     next();
//   });
// };

export const adminAuth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      throw new AppError('Access denied. No token provided.', 401);
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret') as any;
    
    if (decoded.role !== 'admin') {
      throw new AppError('Admin access required', 403);
    }

    (req as any).user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};