import SessionModel from '../models/session';
import { IUser } from '../models/user';

const findOneByUserId = async (userId: string) => {
  return await SessionModel.findOne({ userId });
};

const findOneOrNotFoundByUserId = async (userId: string) => {
  const session = await SessionModel.findOne({ userId });
  if (!session) {
    throw new Error(`Session with user id ${userId} not found`);
  }
  return session;
};

const findOneOrcreateUserSession = async (user: IUser) => {
  try {
    const session = await SessionModel.findOne({ userId: user._id });
    if (session) {
      return session;
    }
    return await SessionModel.create({ userId: user._id });
  } catch (error: any) {
    throw new Error(`Find one or create user session error, ${error.message}`);
  }
};

const sessionService = {
  findOneByUserId,
  findOneOrNotFoundByUserId,
  findOneOrcreateUserSession,
};

export default sessionService;
