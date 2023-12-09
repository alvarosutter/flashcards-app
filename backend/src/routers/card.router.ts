import { Router } from 'express';
import { addCard, removeCard, listCard, listCardLabels, listCards, updateCard } from '../controllers/card.controller';

const cardRouter = Router({ mergeParams: true });

cardRouter.post('/', addCard);
cardRouter.get('/', listCards);
cardRouter.get('/:id', listCard);
cardRouter.get('/:id/labels', listCardLabels);
cardRouter.patch('/:id', updateCard);
cardRouter.delete('/:id', removeCard);

export default cardRouter;
