import { Request, Response, Router } from 'express';
import { authentication } from '../middlewares/auth.middleware';
import cardRouter from './card.router';
import deckRouter from './deck.router';
import labelRouter from './label.router';
import userRouter from './user.router';

const globalRouter = Router({ mergeParams: true });
globalRouter.get('/', async (_: Request, res: Response) => {
  res.send({ message: 'Hello Api' });
});

globalRouter.use('/users', userRouter);
globalRouter.use('/decks', authentication, deckRouter);
globalRouter.use('/labels', authentication, labelRouter);
globalRouter.use('/cards', authentication, cardRouter);

export default globalRouter;
