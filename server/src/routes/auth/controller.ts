import { Request, Response } from 'express';
import authService from '../../services/auth';
import usersService from '../../services/users';
import { LoginBody } from '../../types/auth';

class AuthController {
  async login(req: Request<unknown, unknown, LoginBody>, res: Response) {
    const { email, password } = req.body;

    const user = await usersService.getUserByEmail(email);
    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const isPasswordValid = await authService.isPasswordValid(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const accessToken = authService.generateAccessToken({
      id: user.id,
      fullName: user.fullName,
      email: user.email,
    });

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: false,
      maxAge: 60 * 1000, // 1 minute
    });

    return res.status(204).json({});
  }
}

export default new AuthController();
