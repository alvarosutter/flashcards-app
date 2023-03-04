import { Request, Response, Router } from 'express';
import cardRouter from './card.router';
import deckRouter from './deck.router';
import labelRouter from './label.router';

const globalRouter = Router({ mergeParams: true });
globalRouter.get('/', async (_: Request, res: Response) => {
  res.send({ message: 'Hello Api' });
});

globalRouter.use('/decks', deckRouter);
globalRouter.use('/labels', labelRouter);
globalRouter.use('/cards', cardRouter);

export default globalRouter;
