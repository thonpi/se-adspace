import Joi from 'joi';
import { Request, Response } from 'express';
import { validateJoiSchema } from '../../utils/joi';
import designJobService from '../../services/designJob';

const designJobSchema = Joi.object({
  rentalSpaceId: Joi.string().required(),
  budget: Joi.number().required(),
  requirement: Joi.string().required(),
  status: Joi.string()
    .valid(
      'INACTIVE',
      'UNDER_JOB_MARKET',
      'UNDER_JOB_NEGOTATION',
      'HIRED',
      'FINISHED'
    )
    .default('UNDER_JOB_MARKET'),
});

const createDesignJob = async (req: Request, res: Response) => {
  try {
    const validatedBody = validateJoiSchema(designJobSchema, req.body);
    const resData = await designJobService.createDesignJob(validatedBody);
    res.status(201).json({
      code: 201,
      message: 'Create design job successfully',
      data: resData,
    });
  } catch (error: any) {
    res.status(500).json({
      code: 500,
      message: error.message,
    });
  }
};

export default createDesignJob;
