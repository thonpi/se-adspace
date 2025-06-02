import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import advertisementSpaceService from '../../services/advertisementSpace';

const advertisementSpacePagination = catchAsync(
  async (req: Request, res: Response) => {
    try {
      const resData =
        await advertisementSpaceService.advertisementSpacePagination({
          page: parseInt((req.query.page || '1') as string),
          limit: parseInt((req.query.limit || '10') as string),
          search: {
            name: req.query.name || ('' as any),
            description: req.query.description || ('' as any),
          },
        });
      res.status(200).json({
        code: 200,
        message: 'Get advertisement space pagination successfully',
        data: resData,
      });
    } catch (error: any) {
      res.status(500).json({
        code: 500,
        message: error.message,
      });
    }
  }
);

export default advertisementSpacePagination;
