import { Request, Response } from 'express';
import rentalSpaceService from '../../services/rentalSpace';

const getAllRentalSpaces = async (req: Request, res: Response) => {
  try {
    const resData = await rentalSpaceService.getAllRentalSpaces();
    res.status(200).json({
      code: 200,
      message: 'Get all rental spaces successfully',
      data: resData,
    });
  } catch (error: any) {
    res.status(500).json({
      code: 500,
      message: error.message,
    });
  }
};

export default getAllRentalSpaces;
