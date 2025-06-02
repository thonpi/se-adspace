import { Request, Response } from 'express';
import advertisementSpaceService from '../../services/advertisementSpace';
import Joi from 'joi';
import { validateJoiSchema } from '../../utils/joi';

const advertisementSpaceSchema = Joi.object({
  id: Joi.string().required(),
});

const getAdvertisementSpaceById = async (req: Request, res: Response) => {
  try {
    const validatedBody = validateJoiSchema(advertisementSpaceSchema, req.body);
    const resData = await advertisementSpaceService.findOneOrNotFoundById(
      validatedBody.id
    );
    res.status(200).json({
      code: 200,
      message: 'Get advertisement space by id successfully',
      data: resData,
    });
  } catch (error: any) {
    res.status(500).json({
      code: 500,
      message: error.message,
    });
  }
};

export default getAdvertisementSpaceById;
