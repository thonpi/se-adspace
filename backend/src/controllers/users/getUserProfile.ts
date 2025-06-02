import Joi from 'joi';
import { Request, Response } from 'express';
import userService from '../../services/user';
import { validateJoiSchema } from '../../utils/joi';

const userSchema = Joi.object({
  id: Joi.string().required(),
});

const getUserProfile = async (req: Request, res: Response) => {
  try {
    const validatedBody = validateJoiSchema(userSchema, req.params);
    const resData = await userService.getUserProfile(validatedBody.id);
    res.status(201).json({
      code: 200,
      message: 'User get profile successfully',
      data: resData,
    });
  } catch (error: any) {
    res.status(500).json({
      code: 500,
      message: error.message,
    });
  }
};

export default getUserProfile;
