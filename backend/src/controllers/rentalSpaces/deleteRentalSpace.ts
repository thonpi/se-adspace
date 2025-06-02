import Joi from 'joi';
import { Request, Response } from 'express';
import { validateJoiSchema } from '../../utils/joi';
import rentalSpaceService from '../../services/rentalSpace';

const rentalSpaceSchema = Joi.object({
  id: Joi.string().required(),
});

const deleteRentalSpace = async (req: Request, res: Response) => {
  try {
    const validatedBody = validateJoiSchema(rentalSpaceSchema, req.body);
    const resData = await rentalSpaceService.deleteRentalSpace(
      validatedBody.id
    );

    res.status(200).json({
      code: 200,
      message: 'Delete rental space successfully',
      data: resData,
    });
  } catch (error: any) {
    res.status(500).json({
      code: 500,
      message: error.message,
    });
  }
};

export default deleteRentalSpace;
