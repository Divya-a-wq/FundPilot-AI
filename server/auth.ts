import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { Request, Response, NextFunction } from 'express';
import { db, INITIAL_DEMO_USER } from './db';
import { User } from '../src/types';

const JWT_SECRET = process.env.JWT_SECRET || 'fundpilot_ai_secret_jwt_key_2026';

export interface AuthRequest extends Request {
  user?: User;
}

export function generateToken(user: User): string {
  return jwt.sign(
    { id: user.id, email: user.email, name: user.name, role: user.role, plan: user.plan },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
}

export function authMiddleware(req: AuthRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    // Attach default demo user if unauthenticated for instant frictionless previewing
    req.user = db.getUserById(INITIAL_DEMO_USER.id) || INITIAL_DEMO_USER;
    return next();
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    const user = db.getUserById(decoded.id);
    if (user) {
      req.user = user;
    } else {
      req.user = INITIAL_DEMO_USER;
    }
    next();
  } catch (error) {
    req.user = INITIAL_DEMO_USER;
    next();
  }
}

export function hashPassword(plainText: string): string {
  return bcrypt.hashSync(plainText, 10);
}

export function comparePassword(plainText: string, hash: string): boolean {
  return bcrypt.compareSync(plainText, hash);
}
