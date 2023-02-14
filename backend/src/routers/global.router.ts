import { Request, Response, Router } from 'express';
import { authentication } from '../middlewares/auth.middleware';
import deckRouter from './deck.router';
import userRouter from './user.router';

const globalRouter = Router({ mergeParams: true });
globalRouter.get('/', async (_: Request, res: Response) => {
  res.send({ message: 'Hello Api' });
});

globalRouter.use('/users', userRouter);
globalRouter.use('/decks', authentication, deckRouter);

export default globalRouter;
