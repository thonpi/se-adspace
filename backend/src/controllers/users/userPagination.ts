import { Request, Response } from 'express';
import userService from '../../services/user';

const userPagination = async (req: Request, res: Response) => {
  try {
    const resData = await userService.userPagination({
      page: parseInt(req.query.page || ('1' as any)),
      limit: parseInt(req.query.limit || ('10' as any)),
      search: {
        firstName: req.query.firstName || ('' as any),
        lastName: req.query.lastName || ('' as any),
        phoneNumber: req.query.phoneNumber || ('' as any),
      },
    });
    res.status(200).json({
      code: 200,
      message: 'Get user pagination successfully',
      data: resData,
    });
  } catch (error: any) {
    res.status(500).json({
      code: 500,
      message: error.message,
    });
  }
};

export default userPagination;
