import { Router } from 'express';
import { createCard, deleteCard, getCard, getCardLabels, getCards, patchCard } from '../controllers/card.controller';

const cardRouter = Router({ mergeParams: true });

cardRouter.post('/', createCard);
cardRouter.get('/', getCards);
cardRouter.get('/:cardId', getCard);
cardRouter.get('/:cardId/labels', getCardLabels);
cardRouter.patch('/:cardId', patchCard);
cardRouter.delete('/:cardId', deleteCard);

export default cardRouter;
