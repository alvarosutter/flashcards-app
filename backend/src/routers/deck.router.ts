import { Router } from 'express';
import { addDeck, listDeck, listDeckCards, listDecks, removeDeck, updateDeck } from '../controllers/deck.controller';

const deckRouter = Router({ mergeParams: true });

deckRouter.post('/', addDeck);
deckRouter.get('/', listDecks);
deckRouter.get('/:deckId', listDeck);
deckRouter.get('/:deckId/cards', listDeckCards);
deckRouter.patch('/:deckId', updateDeck);
deckRouter.delete('/:deckId', removeDeck);

export default deckRouter;
