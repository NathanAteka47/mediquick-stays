import jwt, { SignOptions } from 'jsonwebtoken';
import { config } from '../config/env';

export interface TokenPayload {
  userId: string;
  email: string;
  role: string;
}

export class TokenService {
  static generateToken(payload: TokenPayload): string {
    const secret = config.jwt.secret as string;
    if (!secret) {
      throw new Error('JWT secret is not configured');
    }
    return jwt.sign(payload, secret, { expiresIn: '7d' });
  }

  static verifyToken(token: string): TokenPayload {
    const secret = config.jwt.secret as string;
    if (!secret) {
      throw new Error('JWT secret is not configured');
    }
    return jwt.verify(token, secret) as TokenPayload;
  }

  static decodeToken(token: string): TokenPayload | null {
    try {
      return jwt.decode(token) as TokenPayload;
    } catch {
      return null;
    }
  }
}