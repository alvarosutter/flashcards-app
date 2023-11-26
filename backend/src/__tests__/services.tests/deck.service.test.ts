import * as DeckDatabase from '../../database/deck.database';
import { deckData } from '../helper.tests';
import { createDeck, deleteDeck, getDeck, getDeckCards, getDecks, patchDeck } from '../../services/deck.service';
import { IQueryResult } from '../../types/interfaces';

describe('Create Deck', () => {
  describe('Given all is working correctly', () => {
    it('should create a new deck', async () => {
      const input = {
        deckName: 'my deck',
        archived: false,
      };
      const deck = {
        ...deckData,
        ...input,
      };
      const expected: IQueryResult = {
        status: 'success',
        data: { ...deckData, ...input },
      };

      jest.spyOn(DeckDatabase, 'deckCreate').mockResolvedValueOnce(deck);
      const result: IQueryResult = await createDeck(input);
      expect(result).toEqual(expected);
    });
  });
});

describe('Get Deck', () => {
  describe('Given all is working correctly', () => {
    it('should get the deck', async () => {
      const input = {
        deckId: '07d840a2-0dec-4fdb-862d-ccb3536fbde8',
      };
      const deck = {
        ...deckData,
        ...input,
      };
      const expected: IQueryResult = {
        status: 'success',
        data: { ...deckData, ...input },
      };

      jest.spyOn(DeckDatabase, 'deckFind').mockResolvedValueOnce(deck);
      const result: IQueryResult = await getDeck(input.deckId);
      expect(result).toEqual(expected);
    });
  });
});

describe('Get Deck Cards', () => {
  describe('Given all is working correctly', () => {
    it('should get the deck cards', async () => {
      const input = {
        deckId: '07d840a2-0dec-4fdb-862d-ccb3536fbde8',
      };
      const deck = {
        ...deckData,
        ...input,
      };
      const expected: IQueryResult = {
        status: 'success',
        total: deck.cards.length,
        data: deck.cards,
      };

      jest.spyOn(DeckDatabase, 'deckFind').mockResolvedValueOnce(deck);
      const result: IQueryResult = await getDeckCards(input.deckId);
      expect(result).toEqual(expected);
    });
  });
});

describe('Get Decks', () => {
  describe('Given all is working correctly', () => {
    it('should return all the decks', async () => {
      const decks = [deckData];
      const expected: IQueryResult = {
        status: 'success',
        total: decks.length,
        data: decks,
      };

      jest.spyOn(DeckDatabase, 'deckFindMany').mockResolvedValueOnce(decks);
      const result: IQueryResult = await getDecks();
      expect(result).toEqual(expected);
    });
  });
});

describe('Patch Deck', () => {
  describe('Given all is working correctly', () => {
    it('should update the deck', async () => {
      const input = {
        deckId: '07d840a2-0dec-4fdb-862d-ccb3536fbde8',
        deckName: 'my deck',
        archived: true,
      };
      const deck = {
        ...deckData,
        ...input,
      };
      const expected: IQueryResult = {
        status: 'success',
        data: { ...deckData, ...input },
      };

      jest.spyOn(DeckDatabase, 'deckUpdate').mockResolvedValueOnce(deck);
      const result: IQueryResult = await patchDeck(input);
      expect(result).toEqual(expected);
    });
  });
});

describe('Delete Deck', () => {
  describe('Given all is working correctly', () => {
    it('should delete the deck', async () => {
      const input = {
        deckId: '07d840a2-0dec-4fdb-862d-ccb3536fbde8',
      };

      const expected: IQueryResult = {
        status: 'success',
      };

      jest.spyOn(DeckDatabase, 'deckDelete').mockResolvedValueOnce();
      const result: IQueryResult = await deleteDeck(input.deckId);
      expect(result).toEqual(expected);
    });
  });
});
