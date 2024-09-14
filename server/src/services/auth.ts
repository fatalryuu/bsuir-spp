import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AccessTokenPayload } from '../types/auth';

class AuthService {
  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  async isPasswordValid(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }

  generateAccessToken(payload: AccessTokenPayload): string {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET as string, {
      expiresIn: '30m',
    });
  }

  verifyAccessToken(token: string): AccessTokenPayload {
    return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  }
}

export default new AuthService();
