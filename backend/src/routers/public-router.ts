import express, { Request, Response } from 'express';

import register from '../controllers/users/register';
import login from '../controllers/users/login';
import forgotPassword from '../controllers/users/forgotPassword';

const publicRouter = express.Router();

publicRouter.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Welcome to Advertisement Space!' });
});

publicRouter.route('/auth/register').post(register);
publicRouter.route('/auth/login').post(login);
publicRouter.route('/auth/forgot-password').post(forgotPassword);

export default publicRouter;
