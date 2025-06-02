import Joi from 'joi';
import { Request, Response } from 'express';
import { validateJoiSchema } from '../../utils/joi';
import designJobService from '../../services/designJob';

const designJobSchema = Joi.object({
  id: Joi.string().required(),
  rentalSpaceId: Joi.string(),
  budget: Joi.number(),
  requirement: Joi.string(),
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

const updateDesignJob = async (req: Request, res: Response) => {
  try {
    const validatedBody = validateJoiSchema(designJobSchema, req.body);
    const resData = await designJobService.updateDesignJob(
      validatedBody.id,
      validatedBody
    );

    res.status(200).json({
      code: 200,
      message: 'Update rental space successfully',
      data: resData,
    });
  } catch (error: any) {
    res.status(500).json({
      code: 500,
      message: error.message,
    });
  }
};

export default updateDesignJob;
