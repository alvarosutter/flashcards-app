import { Router } from 'express';
import { addDeck, listDeck, listDeckCards, listDecks, removeDeck, updateDeck } from '../controllers/deck.controller';

const deckRouter = Router({ mergeParams: true });

deckRouter.post('/', addDeck);
deckRouter.get('/', listDecks);
deckRouter.get('/:id', listDeck);
deckRouter.get('/:id/cards', listDeckCards);
deckRouter.patch('/:id', updateDeck);
deckRouter.delete('/:id', removeDeck);

export default deckRouter;
