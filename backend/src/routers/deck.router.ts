import { Router } from 'express';
import { createDeck, deleteDeck, getDeck, getDeckCards, getDecks, patchDeck } from '../controllers/deck.controller';

const deckRouter = Router({ mergeParams: true });

deckRouter.post('/', createDeck);
deckRouter.get('/', getDecks);
deckRouter.get('/:deckId', getDeck);
deckRouter.get('/:deckId/cards', getDeckCards);
deckRouter.patch('/:deckId', patchDeck);
deckRouter.delete('/:deckId', deleteDeck);

export default deckRouter;
