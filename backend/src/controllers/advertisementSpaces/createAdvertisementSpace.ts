import Joi from 'joi';
import { Request, Response } from 'express';
import { validateJoiSchema } from '../../utils/joi';
import advertisementSpaceService from '../../services/advertisementSpace';

const advertisementSpaceSchema = Joi.object({
  ownerId: Joi.string().required(),
  name: Joi.string().required(),
  description: Joi.string().required(),
  latitude: Joi.number().required(),
  longitude: Joi.number().required(),
  width: Joi.number().required(),
  height: Joi.number().required(),
  imagePaths: Joi.array().items(Joi.string()),
  status: Joi.string()
    .valid(
      'INACTIVE',
      'AVAILABLE',
      'UNDER_RENT_MARKET',
      'UNDER_RENT_NEGOTATION',
      'RENTED'
    )
    .default('AVAILABLE'),
});

const createAdvertisementSpace = async (req: Request, res: Response) => {
  try {
    const validatedBody = validateJoiSchema(advertisementSpaceSchema, req.body);

    // TODO: validate ownerId and roles, and allow admin create on behalf of users
    // if (
    //   validatedBody.ownerId !== req.authJwtPayload?.id &&
    //   !req.authJwtPayload?.roles.includes('ADMIN')
    // ) {
    //   throw new Error('You are not an ADMIN. Pass your own id');
    // }

    const resData = await advertisementSpaceService.createAdvertisementSpace(
      validatedBody
    );
    res.status(201).json({
      code: 201,
      message: 'Create advertisement space successfully',
      data: resData,
    });
  } catch (error: any) {
    res.status(500).json({
      code: 500,
      message: error.message,
    });
  }
};

export default createAdvertisementSpace;
