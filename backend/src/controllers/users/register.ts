import Joi from 'joi';
import { Request, Response } from 'express';
import userService from '../../services/user';
import { validateJoiSchema } from '../../utils/joi';
import { hashPassword } from '../../utils';

const userSchema = Joi.object({
  firstName: Joi.string().max(30).required(),
  lastName: Joi.string().max(30).required(),

  // TODO: update this
  phoneNumber: Joi.string()
    .pattern(/^[0-9]+$/)
    .min(5)
    .max(15)
    .required(),

  // TODO: update this
  password: Joi.string().min(6).required(),
  roles: Joi.array()
    .items(Joi.string())
    .valid('ADMIN', 'USER')
    .default(['USER']),

  isDesigner: Joi.boolean().default(false),
  status: Joi.boolean().default(true),
});

const register = async (req: Request, res: Response) => {
  try {
    const validatedBody = validateJoiSchema(userSchema, req.body);
    const resData = await userService.register({
      ...validatedBody,
      password: hashPassword(validatedBody.password),
    });
    res.status(201).json({
      code: 201,
      message: 'User registered successfully',
      data: resData,
    });
  } catch (error: any) {
    res.status(500).json({
      code: 500,
      message: error.message,
    });
  }
};

export default register;
