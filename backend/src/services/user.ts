import SessionModel from '../models/session';
import UserModel, { IUser } from '../models/user';
import { comparePassword, excludeUserSensitiveData } from '../utils';
import { generateAuthToken } from '../utils/generateAuthToken';
import sessionService from './session';

const register = async (userPayload: IUser) => {
  try {
    await confirmUserNotExists(userPayload.phoneNumber);
    const user = await UserModel.create(userPayload);
    await sessionService.findOneOrcreateUserSession(user);
    const { accessToken } = await generateAuthToken(user);
    return { accessToken, user: excludeUserSensitiveData(user) };
  } catch (error: any) {
    throw new Error(`Register service error, ${error.message}`);
  }
};

const login = async (phoneNumber: string, password: string) => {
  try {
    const user = await findOneOrNotFoundByPhoneNumber(phoneNumber);

    if (!comparePassword(password, user.password)) {
      throw new Error('Incorrect password');
    }
    await sessionService.findOneOrcreateUserSession(user);
    const { accessToken } = await generateAuthToken(user);
    return { accessToken, user: excludeUserSensitiveData(user) };
  } catch (error) {
    throw new Error(
      'Login service error, Phone number or password is incorrect'
    );
  }
};

const logout = async (userId: string) => {
  try {
    await sessionService.findOneOrNotFoundByUserId(userId);
    await SessionModel.deleteOne({ userId });
  } catch (error: any) {
    throw new Error(`Logout service error, ${error.message}`);
  }
};

const forgotPassword = async (phoneNumber: string, password: string) => {
  try {
    const user = await findOneOrNotFoundByPhoneNumber(phoneNumber);
    await UserModel.updateOne({ _id: user._id }, { password });
  } catch (error: any) {
    throw new Error(`Forgot password service error, ${error.message}`);
  }
};

const updateUserProfile = async (id: string, userPayload: Partial<IUser>) => {
  try {
    const user = await findOneOrNotFoundById(id);
    await UserModel.updateOne({ _id: user._id }, userPayload);
    const updatedUser = await findOneOrNotFoundById(id);
    return { user: excludeUserSensitiveData(updatedUser) };
  } catch (error: any) {
    throw new Error(`Update user profile service error, ${error.message}`);
  }
};

const getUserProfile = async (id: string) => {
  try {
    const user = await findOneOrNotFoundById(id);
    return { user: excludeUserSensitiveData(user) };
  } catch (error: any) {
    throw new Error(`Get user profile service error, ${error.message}`);
  }
};

const userPagination = async (params: UserPaginationParams) => {
  try {
    const {
      page,
      limit,
      search: { firstName, lastName, phoneNumber },
    } = params;
    const total = await UserModel.countDocuments({
      $and: [
        { firstName: { $regex: firstName, $options: 'i' } },
        { lastName: { $regex: lastName, $options: 'i' } },
        { phoneNumber: { $regex: phoneNumber, $options: 'i' } },
      ],
    });
    const users = await UserModel.find({
      $and: [
        { firstName: { $regex: firstName, $options: 'i' } },
        { lastName: { $regex: lastName, $options: 'i' } },
        { phoneNumber: { $regex: phoneNumber, $options: 'i' } },
      ],
    })
      .skip((page - 1) * limit)
      .limit(limit);
    return {
      users: users.map((user: IUser) => excludeUserSensitiveData(user)),
      metaData: {
        page,
        limit,
        total,
      },
    };
  } catch (error: any) {
    throw new Error(`Get user profile service error, ${error.message}`);
  }
};

// Below are helper functions

const confirmUserNotExists = async (phoneNumber: string) => {
  const user = await UserModel.findOne({ phoneNumber });
  if (user) {
    throw new Error(`User with phone number ${phoneNumber} already exists`);
  }
};

const findOneById = async (id: string) => {
  return await UserModel.findById(id);
};

const findOneOrNotFoundById = async (id: string) => {
  const user = await UserModel.findById(id);
  if (!user) {
    throw new Error(`User with id ${id} not found`);
  }
  return user;
};

const findOneOrNotFoundByPhoneNumber = async (phoneNumber: string) => {
  const user = await UserModel.findOne({ phoneNumber });
  if (!user) {
    throw new Error(`User with phone number ${phoneNumber} not found`);
  }
  return user;
};

// interfaces

interface UserPaginationParams {
  page: number;
  limit: number;
  search: Partial<Pick<IUser, 'firstName' | 'lastName' | 'phoneNumber'>>;
}

const userService = {
  register,
  login,
  logout,
  forgotPassword,
  updateUserProfile,
  getUserProfile,
  userPagination,

  // Helpers
  findOneById,
  findOneOrNotFoundById,
  findOneOrNotFoundByPhoneNumber,
};

export default userService;
