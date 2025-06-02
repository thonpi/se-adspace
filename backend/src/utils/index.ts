import { hashSync, compareSync } from 'bcryptjs';
import { IUser } from '../models/user';

export const hashPassword = (raw: string) => {
  return hashSync(raw, 10);
};

export const comparePassword = (raw: string, hashed: string) => {
  return compareSync(raw, hashed);
};

export const excludeUserSensitiveData = (user: IUser) => {
  return {
    _id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    phoneNumber: user.phoneNumber,
    roles: user.roles,
    isDesigner: user.isDesigner,
    status: user.status,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};
