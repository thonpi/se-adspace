import { NextFunction, Request, Response } from 'express';
import { verifyToken } from '../utils/jwt';
import { AuthJwtPayload } from '../utils/generateAuthToken';
import sessionService from '../services/session';
import userService from '../services/user';
import { excludeUserSensitiveData } from '../utils';

const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authToken = req.headers['authorization'] as string;

  if (!authToken) {
    return res
      .status(403)
      .json({ code: 403, error: 'Authorization header is missing' });
  }

  const token = authToken.split('Bearer ')[1];
  if (!token) {
    return res
      .status(401)
      .json({ code: 401, error: 'Bearer token is missing' });
  }

  const payload = verifyToken<AuthJwtPayload>(token);
  if (!payload) {
    return res
      .status(403)
      .json({ code: 403, error: 'Invalid or expired token' });
  }

  const activeSession = await sessionService.findOneByUserId(payload.id);
  if (!activeSession) {
    return res
      .status(403)
      .json({ code: 403, error: 'No session found. Login again' });
  }

  const user = await userService.findOneOrNotFoundById(payload.id);
  (req as any).user = excludeUserSensitiveData(user);

  return next();
};

export default isAuthenticated;
