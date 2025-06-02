import { Request, Response } from 'express';
import designJobService from '../../services/designJob';

const getAllDesignJobs = async (req: Request, res: Response) => {
  try {
    const resData = await designJobService.getAllDesignJobs();
    res.status(200).json({
      code: 200,
      message: 'Get all design jobs successfully',
      data: resData,
    });
  } catch (error: any) {
    res.status(500).json({
      code: 500,
      message: error.message,
    });
  }
};

export default getAllDesignJobs;
