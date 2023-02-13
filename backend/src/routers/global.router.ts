import { Request, Response, Router } from 'express';
import { authentication } from '../middlewares/auth.middleware';
import userRouter from './user.router';

const globalRouter = Router({ mergeParams: true });
globalRouter.get('/', async (_: Request, res: Response) => {
  res.send({ message: 'Hello Api' });
});
globalRouter.get('/test', authentication, async (_: Request, res: Response) => {
  res.send({ message: 'Auth Test' });
});

globalRouter.use('/users', userRouter);

export default globalRouter;
