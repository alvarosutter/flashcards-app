import supertest from 'supertest';
import createServer from '../../utils/server.utils';
import * as DeckService from '../../services/deck.service';
import { deckData } from '../helper.tests';
import IQueryResult from '../../types/queryResult';

const app = createServer();

describe('Add Deck', () => {
  describe('Given all is working correctly', () => {
    it('should create a new deck', async () => {
      const input = {
        name: 'my deck',
        archived: false,
      };
      const expected: IQueryResult = {
        status: 'success',
        data: { ...deckData, ...input },
      };
      const deckServiceMock = jest.spyOn(DeckService, 'createDeck').mockResolvedValueOnce(expected);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const { statusCode, body: responseBody } = await supertest(app).post('/api/v1/decks/').send(input);

      expect(statusCode).toBe(201);
      expect(JSON.stringify(responseBody)).toEqual(JSON.stringify(expected));
      expect(deckServiceMock).toHaveBeenCalled();
    });
  });
  describe('Given the server is not connected to the database', () => {
    it('should return an error', async () => {
      const input = {
        name: 'my deck',
        archived: false,
      };
      const expected: IQueryResult = {
        status: 'failure',
      };
      const deckServiceMock = jest.spyOn(DeckService, 'createDeck').mockRejectedValueOnce(expected);

      await supertest(app).post('/api/v1/decks/').send(input);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const { statusCode, body } = await supertest(app).post('/api/v1/decks/').send(input);

      const responseBody = body as IQueryResult;
      expect(statusCode).toBe(500);
      expect(responseBody.status).toBe(expected.status);
      expect(responseBody.message).toBeDefined();
      expect(responseBody.message?.includes("Can't reach database server")).toBe(true);
      expect(deckServiceMock).toHaveBeenCalled();
    });
  });
  describe('Given something went wrong during adding a new deck', () => {
    it('should return an error', async () => {
      const input = {
        name: 'my deck',
        archived: false,
      };
      const expected = new Error('Error');

      const deckServiceMock = jest.spyOn(DeckService, 'createDeck').mockRejectedValue(expected);

      const { statusCode, text } = await supertest(app).post('/api/v1/decks/').send(input);

      expect(statusCode).toBe(500);
      expect(text).toStrictEqual(expected.message);
      expect(deckServiceMock).toHaveBeenCalled();
    });
  });
});

describe('List Deck Cards', () => {
  describe('Given everything is working correctly', () => {
    it('should return the deck', async () => {
      const id = '07d840a2-0dec-4fdb-862d-ccb3536fbde8';
      const expected: IQueryResult = {
        status: 'success',
        total: deckData.cards.length,
        data: deckData.cards,
      };

      const deckServiceMock = jest.spyOn(DeckService, 'getDeckCards').mockResolvedValueOnce(expected);

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const { statusCode, body: responseBody } = await supertest(app).get(`/api/v1/decks/${id}/cards`);

      expect(statusCode).toBe(200);
      expect(JSON.stringify(responseBody)).toEqual(JSON.stringify(expected));
      expect(deckServiceMock).toHaveBeenCalled();
    });
  });
  describe('Given the server is not connected to the database', () => {
    it('should return an error', async () => {
      const id = '07d840a2-0dec-4fdb-862d-ccb3536fbde8';
      const expected: IQueryResult = {
        status: 'failure',
      };

      jest.spyOn(DeckService, 'getDeckCards').mockRejectedValueOnce(expected);

      await supertest(app).get(`/api/v1/decks/${id}/cards`);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const { statusCode, body } = await supertest(app).get(`/api/v1/decks/${id}/cards`);

      const responseBody = body as IQueryResult;

      expect(statusCode).toBe(500);
      expect(statusCode).toBe(500);
      expect(responseBody.status).toBe(expected.status);
      expect(responseBody.message).toBeDefined();
      expect(responseBody.message?.includes("Can't reach database server")).toBe(true);
    });
  });
  describe('Given something went wrong during updating the deck', () => {
    it('should return an error', async () => {
      const id = '07d840a2-0dec-4fdb-862d-ccb3536fbde8';
      const expected = new Error('Error');

      jest.spyOn(DeckService, 'getDeckCards').mockRejectedValueOnce(expected);

      const { statusCode, text } = await supertest(app).get(`/api/v1/decks/${id}/cards`);

      expect(statusCode).toBe(500);
      expect(text).toStrictEqual(expected.message);
    });
  });
});

describe('List Deck', () => {
  describe('Given everything is working correctly', () => {
    it('should return the deck', async () => {
      const id = '07d840a2-0dec-4fdb-862d-ccb3536fbde8';
      const expected: IQueryResult = {
        status: 'success',
        data: { ...deckData, id },
      };

      const deckServiceMock = jest.spyOn(DeckService, 'getDeck').mockResolvedValueOnce(expected);

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const { statusCode, body: responseBody } = await supertest(app).get(`/api/v1/decks/${id}`);

      expect(statusCode).toBe(200);
      expect(JSON.stringify(responseBody)).toEqual(JSON.stringify(expected));
      expect(deckServiceMock).toHaveBeenCalled();
    });
  });
  describe('Given the server is not connected to the database', () => {
    it('should return an error', async () => {
      const id = '07d840a2-0dec-4fdb-862d-ccb3536fbde8';
      const expected: IQueryResult = {
        status: 'failure',
      };

      jest.spyOn(DeckService, 'getDeck').mockRejectedValueOnce(expected);

      await supertest(app).get(`/api/v1/decks/${id}`);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const { statusCode, body } = await supertest(app).get(`/api/v1/decks/${id}`);

      const responseBody = body as IQueryResult;

      expect(statusCode).toBe(500);
      expect(statusCode).toBe(500);
      expect(responseBody.status).toBe(expected.status);
      expect(responseBody.message).toBeDefined();
      expect(responseBody.message?.includes("Can't reach database server")).toBe(true);
    });
  });
  describe('Given something went wrong during updating the deck', () => {
    it('should return an error', async () => {
      const id = '07d840a2-0dec-4fdb-862d-ccb3536fbde8';
      const expected = new Error('Error');

      jest.spyOn(DeckService, 'getDeck').mockRejectedValueOnce(expected);

      const { statusCode, text } = await supertest(app).get(`/api/v1/decks/${id}`);

      expect(statusCode).toBe(500);
      expect(text).toStrictEqual(expected.message);
    });
  });
});

describe('Update Deck', () => {
  describe('Given the input is valid', () => {
    it('should update the deck data', async () => {
      const input = {
        id: '07d840a2-0dec-4fdb-862d-ccb3536fbde8',
        name: 'my deck',
        archived: true,
      };
      const expected: IQueryResult = {
        status: 'success',
        data: { ...deckData, ...input },
      };

      const deckServiceMock = jest.spyOn(DeckService, 'patchDeck').mockResolvedValueOnce(expected);

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const { statusCode, body: responseBody } = await supertest(app).patch(`/api/v1/decks/${input.id}`).send(input);

      expect(statusCode).toBe(200);
      expect(JSON.stringify(responseBody)).toEqual(JSON.stringify(expected));
      expect(deckServiceMock).toHaveBeenCalled();
    });
  });
  describe('Given the server is not connected to the database', () => {
    it('should return an error', async () => {
      const id = '07d840a2-0dec-4fdb-862d-ccb3536fbde8';
      const expected: IQueryResult = {
        status: 'failure',
      };

      jest.spyOn(DeckService, 'patchDeck').mockRejectedValueOnce(expected);

      await supertest(app).patch(`/api/v1/decks/${id}`);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const { statusCode, body } = await supertest(app).patch(`/api/v1/decks/${id}`);

      const responseBody = body as IQueryResult;

      expect(statusCode).toBe(500);
      expect(statusCode).toBe(500);
      expect(responseBody.status).toBe(expected.status);
      expect(responseBody.message).toBeDefined();
      expect(responseBody.message?.includes("Can't reach database server")).toBe(true);
    });
  });
  describe('Given something went wrong during updating the deck', () => {
    it('should return an error', async () => {
      const id = '07d840a2-0dec-4fdb-862d-ccb3536fbde8';
      const expected = new Error('Error');

      jest.spyOn(DeckService, 'patchDeck').mockRejectedValueOnce(expected);

      const { statusCode, text } = await supertest(app).patch(`/api/v1/decks/${id}`);

      expect(statusCode).toBe(500);
      expect(text).toStrictEqual(expected.message);
    });
  });
});

describe('Remove Deck', () => {
  describe('Given all is working correctly', () => {
    it('should delete the deck', async () => {
      const id = '07d840a2-0dec-4fdb-862d-ccb3536fbde8';
      const expected: IQueryResult = {
        status: 'success',
      };

      jest.spyOn(DeckService, 'deleteDeck').mockResolvedValueOnce(expected);

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const { statusCode, body: responseBody } = await supertest(app).delete(`/api/v1/decks/${id}`);

      expect(statusCode).toBe(204);
      expect(responseBody).toEqual({});
    });
  });
  describe('Given the server is not connected to the database', () => {
    it('should return an error', async () => {
      const id = '07d840a2-0dec-4fdb-862d-ccb3536fbde8';
      const expected: IQueryResult = {
        status: 'failure',
      };

      jest.spyOn(DeckService, 'deleteDeck').mockRejectedValueOnce(expected);

      await supertest(app).delete(`/api/v1/decks/${id}`);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const { statusCode, body } = await supertest(app).delete(`/api/v1/decks/${id}`);

      const responseBody = body as IQueryResult;

      expect(statusCode).toBe(500);
      expect(responseBody.status).toBe(expected.status);
      expect(responseBody.message).toBeDefined();
      expect(responseBody.message?.includes("Can't reach database server")).toBe(true);
    });
  });
  describe('Given something went wrong during removing the deck', () => {
    it('should return an error', async () => {
      const id = '07d840a2-0dec-4fdb-862d-ccb3536fbde8';
      const expected = new Error('Error');

      jest.spyOn(DeckService, 'deleteDeck').mockRejectedValueOnce(expected);

      const { statusCode, text } = await supertest(app).delete(`/api/v1/decks/${id}`);

      expect(statusCode).toBe(500);
      expect(text).toStrictEqual(expected.message);
    });
  });
});

describe('List Decks', () => {
  describe('Given all is working correctly', () => {
    it('should return all the decks', async () => {
      const expected: IQueryResult = {
        status: 'success',
        total: 2,
        data: [deckData, deckData],
      };

      jest.spyOn(DeckService, 'getDecks').mockResolvedValueOnce(expected);

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const { statusCode, body: responseBody } = await supertest(app).get('/api/v1/decks/');

      expect(statusCode).toBe(200);
      expect(JSON.stringify(responseBody)).toEqual(JSON.stringify(expected));
    });
  });
  describe('Given the server is not connected to the database', () => {
    it('should return an error', async () => {
      const expected: IQueryResult = {
        status: 'failure',
      };

      jest.spyOn(DeckService, 'getDecks').mockRejectedValueOnce(expected);

      await supertest(app).get('/api/v1/decks/');
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const { statusCode, body } = await supertest(app).get('/api/v1/decks/');

      const responseBody = body as IQueryResult;

      expect(statusCode).toBe(500);
      expect(responseBody.status).toBe(expected.status);
      expect(responseBody.message).toBeDefined();
      expect(responseBody.message?.includes("Can't reach database server")).toBe(true);
    });
  });
  describe('Given something went wrong during getting all the decks', () => {
    it('should return an error', async () => {
      const expected = new Error('Error');

      jest.spyOn(DeckService, 'getDecks').mockRejectedValue(expected);

      const { statusCode, text } = await supertest(app).get('/api/v1/decks');

      expect(statusCode).toBe(500);
      expect(text).toStrictEqual(expected.message);
    });
  });
});
