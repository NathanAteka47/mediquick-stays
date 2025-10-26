import { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/userService';
import { TokenService } from '../services/tokenService';
import { AppError } from '../middleware/errorHandler';
import { AuthRequest } from '../types';

export class AuthController {
  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, email, password, phone } = req.body;

      // Check if user already exists
      const existingUser = await UserService.findUserByEmail(email);
      if (existingUser) {
        throw new AppError('User with this email already exists', 400);
      }

      // Create user
      const user = await UserService.createUser({
        name,
        email,
        password,
        phone
      });

      // Generate token
      const token = TokenService.generateToken({
        userId: user._id.toString(),
        email: user.email,
        role: user.role
      });

      res.status(201).json({
        success: true,
        message: 'User registered successfully',
        data: {
          user,
          token
        }
      });
    } catch (error) {
      next(error);
    }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;

      // Find user
      const user = await UserService.findUserByEmail(email);
      if (!user) {
        throw new AppError('Invalid email or password', 401);
      }

      // Check password
      const isPasswordValid = await UserService.comparePassword(password, user.password);
      if (!isPasswordValid) {
        throw new AppError('Invalid email or password', 401);
      }

      // Generate token
      const token = TokenService.generateToken({
        userId: user._id.toString(),
        email: user.email,
        role: user.role
      });

      res.json({
        success: true,
        message: 'Login successful',
        data: {
          user,
          token
        }
      });
    } catch (error) {
      next(error);
    }
  }

  static async getProfile(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const user = await UserService.findUserByEmail(req.user!.email);
      
      res.json({
        success: true,
        data: user
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateProfile(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { name, phone } = req.body;
      const userId = req.user!.userId;

      const updatedUser = await UserService.updateUser(userId, {
        name,
        phone
      });

      res.json({
        success: true,
        message: 'Profile updated successfully',
        data: updatedUser
      });
    } catch (error) {
      next(error);
    }
  }
}