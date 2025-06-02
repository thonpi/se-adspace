import { Request, Response } from 'express';
import advertisementSpaceService from '../../services/advertisementSpace';

const getAllAdvertisementSpaces = async (req: Request, res: Response) => {
  try {
    const resData = await advertisementSpaceService.getAllAdvertisementSpaces({
      search: {
        name: req.query.name || ('' as any),
        description: req.query.description || ('' as any),
      },
    });
    res.status(200).json({
      code: 200,
      message: 'Get all advertisement spaces successfully',
      data: resData,
    });
  } catch (error: any) {
    res.status(500).json({
      code: 500,
      message: error.message,
    });
  }
};

export default getAllAdvertisementSpaces;
