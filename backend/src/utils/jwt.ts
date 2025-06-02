import jwt from 'jsonwebtoken';
import env from '../utils/env';

interface SignTokenOptions<TPayload> {
  payload: TPayload;
  expiresIn?: number;
}

export const signToken = <TPayload>(options: SignTokenOptions<TPayload>) => {
  return jwt.sign(options.payload as any, env.JWT_SECRET, {
    expiresIn: options.expiresIn ?? env.JWT_EXPIRES_IN,
  });
};

export const verifyToken = <TPayload>(token: string) => {
  try {
    return jwt.verify(token, env.JWT_SECRET) as TPayload;
  } catch (error) {
    return null;
  }
};
