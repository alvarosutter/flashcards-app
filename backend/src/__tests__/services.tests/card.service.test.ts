import * as CardDatabase from '../../database/card.database';
import { cardData } from '../helper.tests';
import { createCard, deleteCard, getCard, getCardLabels, getCards, patchCard } from '../../services/card.service';
import mapLabels from '../../utils/mapLabels.utils';
import IQueryResult from '../../types/queryResult';

describe('Create Card', () => {
  describe('Given all is working correctly', () => {
    it('should create a new card', async () => {
      const input = {
        name: 'my card',
        content: 'my content',
        deckId: '07d840a2-0dec-4fdb-862d-ccb3536fbde8',
      };
      const card = {
        ...cardData,
        ...input,
      };
      const expected: IQueryResult = {
        status: 'success',
        data: { ...cardData, labels: mapLabels(cardData.labels), ...input },
      };

      jest.spyOn(CardDatabase, 'cardCreate').mockResolvedValueOnce(card);
      const result: IQueryResult = await createCard(input);
      expect(result).toEqual(expected);
    });
  });
});

describe('Get Card', () => {
  describe('Given all is working correctly', () => {
    it('should get the card', async () => {
      const input = {
        id: '9dbaccb9-cab7-4846-9122-d005fd53755c',
      };
      const card = {
        ...cardData,
        ...input,
      };
      const expected: IQueryResult = {
        status: 'success',
        data: { ...cardData, labels: mapLabels(cardData.labels), ...input },
      };

      jest.spyOn(CardDatabase, 'cardFind').mockResolvedValueOnce(card);
      const result: IQueryResult = await getCard(input.id);
      expect(result).toEqual(expected);
    });
  });
});

describe('Get Card Labels', () => {
  describe('Given all is working correctly', () => {
    it('should get the card labels', async () => {
      const input = {
        id: '9dbaccb9-cab7-4846-9122-d005fd53755c',
      };
      const card = {
        ...cardData,
        ...input,
      };
      const expected: IQueryResult = {
        status: 'success',
        total: card.labels.length,
        data: mapLabels(cardData.labels),
      };

      jest.spyOn(CardDatabase, 'cardFind').mockResolvedValueOnce(card);
      const result: IQueryResult = await getCardLabels(input.id);
      expect(result).toEqual(expected);
    });
  });
});

describe('Get Cards', () => {
  describe('Given all is working correctly', () => {
    it('should return all the cards', async () => {
      const cards = [cardData];
      const expected: IQueryResult = {
        status: 'success',
        total: cards.length,
        data: cards.map((card) => ({
          ...card,
          labels: mapLabels(card.labels),
        })),
      };

      jest.spyOn(CardDatabase, 'cardFindMany').mockResolvedValueOnce(cards);
      const result: IQueryResult = await getCards();
      expect(result).toEqual(expected);
    });
  });
});

describe('Patch Card', () => {
  describe('Given all is working correctly', () => {
    it('should update the card', async () => {
      const input = {
        id: '9dbaccb9-cab7-4846-9122-d005fd53755c',
        name: 'my card',
        content: 'my content',
      };
      const card = {
        ...cardData,
        ...input,
      };
      const expected: IQueryResult = {
        status: 'success',
        data: { ...cardData, labels: mapLabels(cardData.labels), ...input },
      };

      jest.spyOn(CardDatabase, 'cardUpdate').mockResolvedValueOnce(card);
      const result: IQueryResult = await patchCard(input);
      expect(result).toEqual(expected);
    });
  });
});

describe('Delete Card', () => {
  describe('Given all is working correctly', () => {
    it('should delete the card', async () => {
      const input = {
        id: '9dbaccb9-cab7-4846-9122-d005fd53755c',
      };

      const expected: IQueryResult = {
        status: 'success',
      };

      jest.spyOn(CardDatabase, 'cardDelete').mockResolvedValueOnce();
      const result: IQueryResult = await deleteCard(input.id);
      expect(result).toEqual(expected);
    });
  });
});
