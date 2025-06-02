import Joi from 'joi';
import { Request, Response } from 'express';
import { validateJoiSchema } from '../../utils/joi';
import advertisementSpaceService from '../../services/advertisementSpace';

const advertisementSpaceSchema = Joi.object({
  id: Joi.string().required(),
  ownerId: Joi.string(),
  name: Joi.string(),
  description: Joi.string(),
  latitude: Joi.number(),
  longitude: Joi.number(),
  width: Joi.number(),
  height: Joi.number(),
  imagePaths: Joi.array().items(Joi.string()),
  status: Joi.string().valid(
    'INACTIVE',
    'AVAILABLE',
    'UNDER_RENT_MARKET',
    'UNDER_RENT_NEGOTATION',
    'RENTED'
  ),
});

const updateAdvertisementSpace = async (req: Request, res: Response) => {
  try {
    const validatedBody = validateJoiSchema(advertisementSpaceSchema, req.body);

    const resData = await advertisementSpaceService.updateAdvertisementSpace(
      validatedBody.id,
      validatedBody
    );
    res.status(200).json({
      code: 200,
      message: 'Update advertisement spaced successfully',
      data: resData,
    });
  } catch (error: any) {
    res.status(500).json({
      code: 500,
      message: error.message,
    });
  }
};

export default updateAdvertisementSpace;
