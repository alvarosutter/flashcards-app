import { Router } from 'express';
import { addCard, removeCard, listCard, listCardLabels, listCards, updateCard } from '../controllers/card.controller';

const cardRouter = Router({ mergeParams: true });

cardRouter.post('/', addCard);
cardRouter.get('/', listCards);
cardRouter.get('/:cardId', listCard);
cardRouter.get('/:cardId/labels', listCardLabels);
cardRouter.patch('/:cardId', updateCard);
cardRouter.delete('/:cardId', removeCard);

export default cardRouter;
