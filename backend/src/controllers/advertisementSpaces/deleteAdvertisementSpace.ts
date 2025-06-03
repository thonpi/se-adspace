import Joi from 'joi';
import { Request, Response } from 'express';
import { validateJoiSchema } from '../../utils/joi';
import advertisementSpaceService from '../../services/advertisementSpace';

const advertisementSpaceSchema = Joi.object({
  id: Joi.string().required(),
});

const deleteAdvertisementSpace = async (req: Request, res: Response) => {
  try {
    const validatedParams = validateJoiSchema(
      advertisementSpaceSchema,
      req.params
    );

    const resData = await advertisementSpaceService.deleteAdvertisementSpace(
      validatedParams.id
    );
    res.status(200).json({
      code: 200,
      message: 'Delete advertisement spaceed successfully',
      data: resData,
    });
  } catch (error: any) {
    res.status(500).json({
      code: 500,
      message: error.message,
    });
  }
};

export default deleteAdvertisementSpace;
