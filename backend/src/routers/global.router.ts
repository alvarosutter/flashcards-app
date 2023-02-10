import { Request, Response, Router } from 'express';

const globalRouter = Router({ mergeParams: true });
globalRouter.get('/', async (_: Request, res: Response) => {
  res.send({ message: 'Hello Api' });
});

export default globalRouter;
