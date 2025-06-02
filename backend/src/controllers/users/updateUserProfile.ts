import Joi from 'joi';
import { Request, Response } from 'express';
import userService from '../../services/user';
import { validateJoiSchema } from '../../utils/joi';

const userSchema = Joi.object({
  id: Joi.string().required(),
  firstName: Joi.string().max(30),
  lastName: Joi.string().max(30),
  isDesigner: Joi.boolean(),
  status: Joi.boolean(),
});

const updateUserProfile = async (req: Request, res: Response) => {
  try {
    const validatedBody = validateJoiSchema(userSchema, req.body);
    const resData = await userService.updateUserProfile(
      validatedBody.id,
      validatedBody
    );
    res.status(200).json({
      code: 200,
      message: 'User update profile successfully',
      data: resData,
    });
  } catch (error: any) {
    res.status(500).json({
      code: 500,
      message: error.message,
    });
  }
};

export default updateUserProfile;
