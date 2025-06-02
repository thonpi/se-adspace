import { IUser } from '../models/user';
import { signToken } from './jwt';

export interface AuthJwtPayload {
  id: string;
  phoneNumber: string;
  roles: string[];
}

export const generateAuthToken = async (user: IUser) => {
  const accessToken = signToken<AuthJwtPayload>({
    payload: {
      id: user._id as string,
      phoneNumber: user.phoneNumber,
      roles: user.roles,
    },
  });

  return { accessToken, user };
};
