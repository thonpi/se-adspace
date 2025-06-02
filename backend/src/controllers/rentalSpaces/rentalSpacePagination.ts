import { Request, Response } from 'express';
import rentalSpaceService from '../../services/rentalSpace';

const rentalSpacePagination = async (req: Request, res: Response) => {
  try {
    const resData = await rentalSpaceService.rentalSpacePagination({
      page: parseInt((req.query.page || '1') as string),
      limit: parseInt((req.query.limit || '10') as string),
    });
    res.status(200).json({
      code: 200,
      message: 'Get rental space pagination successfully',
      data: resData,
    });
  } catch (error: any) {
    res.status(500).json({
      code: 500,
      message: error.message,
    });
  }
};

export default rentalSpacePagination;
