import { Request, Response } from 'express';
import Joi from 'joi';
import { validateJoiSchema } from '../../utils/joi';
import designJobService from '../../services/designJob';

const designJobSchema = Joi.object({
  id: Joi.string().required(),
});

const getDesignJobById = async (req: Request, res: Response) => {
  try {
    const validatedBody = validateJoiSchema(designJobSchema, req.body);
    const resData = await designJobService.findOneOrNotFoundById(
      validatedBody.id
    );
    res.status(200).json({
      code: 200,
      message: 'Get deisgn job by id successfully',
      data: resData,
    });
  } catch (error: any) {
    res.status(500).json({
      code: 500,
      message: error.message,
    });
  }
};

export default getDesignJobById;
