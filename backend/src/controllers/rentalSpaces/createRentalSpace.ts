import Joi from 'joi';
import { Request, Response } from 'express';
import { validateJoiSchema } from '../../utils/joi';
import rentalSpaceService from '../../services/rentalSpace';

const rentalSpaceSchema = Joi.object({
  spaceId: Joi.string().required(),
  monthlyPrice: Joi.number().required(),
  yearlyPrice: Joi.number().required(),
  status: Joi.string()
    .valid(
      'INACTIVE',
      'UNDER_RENT_MARKET',
      'UNDER_RENT_NEGOTATION',
      'RENTED',
      'EXPIRED'
    )
    .default('UNDER_RENT_MARKET'),
});

const createRentalSpace = async (req: Request, res: Response) => {
  try {
    const validatedBody = validateJoiSchema(rentalSpaceSchema, req.body);
    const resData = await rentalSpaceService.createRentalSpace(validatedBody);
    res.status(201).json({
      code: 201,
      message: 'Create rental space successfully',
      data: resData,
    });
  } catch (error: any) {
    res.status(500).json({
      code: 500,
      message: error.message,
    });
  }
};

export default createRentalSpace;
