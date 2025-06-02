import Joi from 'joi';
import { Request, Response } from 'express';
import { validateJoiSchema } from '../../utils/joi';
import rentalSpaceService from '../../services/rentalSpace';

const rentalSpaceSchema = Joi.object({
  id: Joi.string().required(),
  spaceId: Joi.string(),
  monthlyPrice: Joi.number(),
  yearlyPrice: Joi.number(),
  status: Joi.string().valid(
    'INACTIVE',
    'UNDER_RENT_MARKET',
    'UNDER_RENT_NEGOTATION',
    'RENTED',
    'EXPIRED'
  ),
});

const updateRentalSpace = async (req: Request, res: Response) => {
  try {
    const validatedBody = validateJoiSchema(rentalSpaceSchema, req.body);
    const resData = await rentalSpaceService.updateRentalSpace(
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

export default updateRentalSpace;
