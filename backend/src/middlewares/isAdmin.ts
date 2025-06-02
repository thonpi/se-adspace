import { NextFunction, Request, Response } from 'express';
import { verifyToken } from '../utils/jwt';
import { AuthJwtPayload } from '../utils/generateAuthToken';
import userService from '../services/user';

const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
  const authToken = req.headers['authorization'] as string;
  const token = authToken.split('Bearer ')[1];
  const payload = verifyToken<AuthJwtPayload>(token);

  const user = await userService.findOneById(payload?.id || '');
  if (!user?.roles.includes('ADMIN')) {
    return res.status(403).json({ code: 403, error: 'You are not an admin' });
  }

  next();
};

export default isAdmin;
