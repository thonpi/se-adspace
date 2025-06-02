import Joi from 'joi';
import { Request, Response } from 'express';
import userService from '../../services/user';
import { validateJoiSchema } from '../../utils/joi';

const userSchema = Joi.object({
  // TODO: update this
  phoneNumber: Joi.string()
    .pattern(/^[0-9]+$/)
    .min(5)
    .max(15)
    .required(),

  // TODO: update this
  password: Joi.string().required(),
});

const login = async (req: Request, res: Response) => {
  try {
    const validatedBody = validateJoiSchema(userSchema, req.body);
    const resData = await userService.login(
      validatedBody.phoneNumber,
      validatedBody.password
    );
    res.status(200).json({
      code: 200,
      message: 'User logged-in successfully',
      data: resData,
    });
  } catch (error: any) {
    res.status(500).json({
      code: 500,
      message: error.message,
    });
  }
};

export default login;
