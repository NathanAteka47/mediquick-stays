// routes/admin-auth.ts
import express, { Request, Response, Router } from 'express';
import jwt from 'jsonwebtoken';
import { AppError } from '../middleware/errorHandler';

const router: Router = express.Router();

interface AdminLoginRequest {
  email: string;
  password: string;
}

// POST /api/admin/auth/login
router.post('/login', async (req: Request<{}, any, AdminLoginRequest>, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new AppError('Email and password are required', 400);
    }

    // Hardcoded admin credentials for development
    const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@mediquick.com';
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

    console.log('🔐 Admin login attempt:', { email, providedPassword: password ? '***' : 'empty' });

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      // Create admin token
      const token = jwt.sign(
        { 
          userId: 'admin', 
          email: ADMIN_EMAIL, 
          role: 'admin',
          name: 'System Administrator'
        },
        process.env.JWT_SECRET || 'fallback-secret',
        { expiresIn: '24h' }
      );

      console.log('✅ Admin login successful');

      res.json({
        success: true,
        message: 'Admin login successful',
        data: {
          token,
          user: {
            id: 'admin',
            email: ADMIN_EMAIL,
            name: 'System Administrator',
            role: 'admin'
          }
        }
      });
    } else {
      console.log('❌ Invalid admin credentials');
      throw new AppError('Invalid admin credentials', 401);
    }

  } catch (error: any) {
    console.error('Admin login error:', error);
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || 'Login failed'
    });
  }
});

// GET /api/admin/auth/verify
router.get('/verify', async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
      throw new AppError('No token provided', 401);
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret') as any;
    
    if (decoded.role !== 'admin') {
      throw new AppError('Admin access required', 403);
    }

    res.json({
      success: true,
      data: {
        user: decoded
      }
    });

  } catch (error: any) {
    console.error('Token verification error:', error);
    res.status(401).json({
      success: false,
      message: 'Invalid or expired token'
    });
  }
});

export default router;