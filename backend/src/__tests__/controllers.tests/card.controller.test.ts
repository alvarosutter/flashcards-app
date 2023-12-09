import supertest from 'supertest';
import createServer from '../../utils/server.utils';
import * as CardService from '../../services/card.service';
import { cardData } from '../helper.tests';
import IQueryResult from '../../types/queryResult';

const app = createServer();

describe('Add Card', () => {
  describe('Given all is working correctly', () => {
    it('should create a new card', async () => {
      const input = {
        name: 'my card',
      };
      const expected: IQueryResult = {
        status: 'success',
        data: { ...cardData, ...input },
      };
      const cardServiceMock = jest.spyOn(CardService, 'createCard').mockResolvedValueOnce(expected);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const { statusCode, body: responseBody } = await supertest(app).post('/api/v1/cards/').send(input);

      expect(statusCode).toBe(201);
      expect(JSON.stringify(responseBody)).toEqual(JSON.stringify(expected));
      expect(cardServiceMock).toHaveBeenCalled();
    });
  });
  describe('Given the server is not connected to the database', () => {
    it('should return an error', async () => {
      const input = {
        name: 'my card',
      };
      const expected: IQueryResult = {
        status: 'failure',
      };
      const cardServiceMock = jest.spyOn(CardService, 'createCard').mockRejectedValueOnce(expected);

      await supertest(app).post('/api/v1/cards/').send(input);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const { statusCode, body } = await supertest(app).post('/api/v1/cards/').send(input);

      const responseBody = body as IQueryResult;
      expect(statusCode).toBe(500);
      expect(responseBody.status).toBe(expected.status);
      expect(responseBody.message).toBeDefined();
      expect(responseBody.message?.includes("Can't reach database server")).toBe(true);
      expect(cardServiceMock).toHaveBeenCalled();
    });
  });
  describe('Given something went wrong during adding a new card', () => {
    it('should return an error', async () => {
      const input = {
        name: 'my card',
      };
      const expected = new Error('Error');

      const cardServiceMock = jest.spyOn(CardService, 'createCard').mockRejectedValue(expected);

      const { statusCode, text } = await supertest(app).post('/api/v1/cards/').send(input);

      expect(statusCode).toBe(500);
      expect(text).toStrictEqual(expected.message);
      expect(cardServiceMock).toHaveBeenCalled();
    });
  });
});

describe('List Card Cards', () => {
  describe('Given everything is working correctly', () => {
    it('should return the card', async () => {
      const id = '07d840a2-0dec-4fdb-862d-ccb3536fbde8';
      const expected: IQueryResult = {
        status: 'success',
        total: cardData.labels.length,
        data: cardData.labels,
      };

      const cardServiceMock = jest.spyOn(CardService, 'getCardLabels').mockResolvedValueOnce(expected);

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const { statusCode, body: responseBody } = await supertest(app).get(`/api/v1/cards/${id}/labels`);

      expect(statusCode).toBe(200);
      expect(JSON.stringify(responseBody)).toEqual(JSON.stringify(expected));
      expect(cardServiceMock).toHaveBeenCalled();
    });
  });
  describe('Given the server is not connected to the database', () => {
    it('should return an error', async () => {
      const id = '07d840a2-0dec-4fdb-862d-ccb3536fbde8';
      const expected: IQueryResult = {
        status: 'failure',
      };

      jest.spyOn(CardService, 'getCardLabels').mockRejectedValueOnce(expected);

      await supertest(app).get(`/api/v1/cards/${id}/labels`);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const { statusCode, body } = await supertest(app).get(`/api/v1/cards/${id}/labels`);

      const responseBody = body as IQueryResult;

      expect(statusCode).toBe(500);
      expect(statusCode).toBe(500);
      expect(responseBody.status).toBe(expected.status);
      expect(responseBody.message).toBeDefined();
      expect(responseBody.message?.includes("Can't reach database server")).toBe(true);
    });
  });
  describe('Given something went wrong during updating the card', () => {
    it('should return an error', async () => {
      const id = '07d840a2-0dec-4fdb-862d-ccb3536fbde8';
      const expected = new Error('Error');

      jest.spyOn(CardService, 'getCardLabels').mockRejectedValueOnce(expected);

      const { statusCode, text } = await supertest(app).get(`/api/v1/cards/${id}/labels`);

      expect(statusCode).toBe(500);
      expect(text).toStrictEqual(expected.message);
    });
  });
});

describe('List Card', () => {
  describe('Given everything is working correctly', () => {
    it('should return the card', async () => {
      const id = '07d840a2-0dec-4fdb-862d-ccb3536fbde8';
      const expected: IQueryResult = {
        status: 'success',
        data: { ...cardData, id },
      };

      const cardServiceMock = jest.spyOn(CardService, 'getCard').mockResolvedValueOnce(expected);

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const { statusCode, body: responseBody } = await supertest(app).get(`/api/v1/cards/${id}`);

      expect(statusCode).toBe(200);
      expect(JSON.stringify(responseBody)).toEqual(JSON.stringify(expected));
      expect(cardServiceMock).toHaveBeenCalled();
    });
  });
  describe('Given the server is not connected to the database', () => {
    it('should return an error', async () => {
      const id = '07d840a2-0dec-4fdb-862d-ccb3536fbde8';
      const expected: IQueryResult = {
        status: 'failure',
      };

      jest.spyOn(CardService, 'getCard').mockRejectedValueOnce(expected);

      await supertest(app).get(`/api/v1/cards/${id}`);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const { statusCode, body } = await supertest(app).get(`/api/v1/cards/${id}`);

      const responseBody = body as IQueryResult;

      expect(statusCode).toBe(500);
      expect(statusCode).toBe(500);
      expect(responseBody.status).toBe(expected.status);
      expect(responseBody.message).toBeDefined();
      expect(responseBody.message?.includes("Can't reach database server")).toBe(true);
    });
  });
  describe('Given something went wrong during updating the card', () => {
    it('should return an error', async () => {
      const id = '07d840a2-0dec-4fdb-862d-ccb3536fbde8';
      const expected = new Error('Error');

      jest.spyOn(CardService, 'getCard').mockRejectedValueOnce(expected);

      const { statusCode, text } = await supertest(app).get(`/api/v1/cards/${id}`);

      expect(statusCode).toBe(500);
      expect(text).toStrictEqual(expected.message);
    });
  });
});

describe('Update Card', () => {
  describe('Given the input is valid', () => {
    it('should update the card data', async () => {
      const input = {
        id: '07d840a2-0dec-4fdb-862d-ccb3536fbde8',
        name: 'my card',
      };
      const expected: IQueryResult = {
        status: 'success',
        data: { ...cardData, ...input },
      };

      const cardServiceMock = jest.spyOn(CardService, 'patchCard').mockResolvedValueOnce(expected);

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const { statusCode, body: responseBody } = await supertest(app).patch(`/api/v1/cards/${input.id}`).send(input);

      expect(statusCode).toBe(200);
      expect(JSON.stringify(responseBody)).toEqual(JSON.stringify(expected));
      expect(cardServiceMock).toHaveBeenCalled();
    });
  });
  describe('Given the server is not connected to the database', () => {
    it('should return an error', async () => {
      const id = '07d840a2-0dec-4fdb-862d-ccb3536fbde8';
      const expected: IQueryResult = {
        status: 'failure',
      };

      jest.spyOn(CardService, 'patchCard').mockRejectedValueOnce(expected);

      await supertest(app).patch(`/api/v1/cards/${id}`);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const { statusCode, body } = await supertest(app).patch(`/api/v1/cards/${id}`);

      const responseBody = body as IQueryResult;

      expect(statusCode).toBe(500);
      expect(statusCode).toBe(500);
      expect(responseBody.status).toBe(expected.status);
      expect(responseBody.message).toBeDefined();
      expect(responseBody.message?.includes("Can't reach database server")).toBe(true);
    });
  });
  describe('Given something went wrong during updating the card', () => {
    it('should return an error', async () => {
      const id = '07d840a2-0dec-4fdb-862d-ccb3536fbde8';
      const expected = new Error('Error');

      jest.spyOn(CardService, 'patchCard').mockRejectedValueOnce(expected);

      const { statusCode, text } = await supertest(app).patch(`/api/v1/cards/${id}`);

      expect(statusCode).toBe(500);
      expect(text).toStrictEqual(expected.message);
    });
  });
});

describe('Remove Card', () => {
  describe('Given all is working correctly', () => {
    it('should delete the card', async () => {
      const id = '07d840a2-0dec-4fdb-862d-ccb3536fbde8';
      const expected: IQueryResult = {
        status: 'success',
      };

      jest.spyOn(CardService, 'deleteCard').mockResolvedValueOnce(expected);

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const { statusCode, body: responseBody } = await supertest(app).delete(`/api/v1/cards/${id}`);

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

      jest.spyOn(CardService, 'deleteCard').mockRejectedValueOnce(expected);

      await supertest(app).delete(`/api/v1/cards/${id}`);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const { statusCode, body } = await supertest(app).delete(`/api/v1/cards/${id}`);

      const responseBody = body as IQueryResult;

      expect(statusCode).toBe(500);
      expect(responseBody.status).toBe(expected.status);
      expect(responseBody.message).toBeDefined();
      expect(responseBody.message?.includes("Can't reach database server")).toBe(true);
    });
  });
  describe('Given something went wrong during removing the card', () => {
    it('should return an error', async () => {
      const id = '07d840a2-0dec-4fdb-862d-ccb3536fbde8';
      const expected = new Error('Error');

      jest.spyOn(CardService, 'deleteCard').mockRejectedValueOnce(expected);

      const { statusCode, text } = await supertest(app).delete(`/api/v1/cards/${id}`);

      expect(statusCode).toBe(500);
      expect(text).toStrictEqual(expected.message);
    });
  });
});

describe('List Cards', () => {
  describe('Given all is working correctly', () => {
    it('should return all the cards', async () => {
      const expected: IQueryResult = {
        status: 'success',
        total: 2,
        data: [cardData, cardData],
      };

      jest.spyOn(CardService, 'getCards').mockResolvedValueOnce(expected);

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const { statusCode, body: responseBody } = await supertest(app).get('/api/v1/cards/');

      expect(statusCode).toBe(200);
      expect(JSON.stringify(responseBody)).toEqual(JSON.stringify(expected));
    });
  });
  describe('Given the server is not connected to the database', () => {
    it('should return an error', async () => {
      const expected: IQueryResult = {
        status: 'failure',
      };

      jest.spyOn(CardService, 'getCards').mockRejectedValueOnce(expected);

      await supertest(app).get('/api/v1/cards/');
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const { statusCode, body } = await supertest(app).get('/api/v1/cards/');

      const responseBody = body as IQueryResult;

      expect(statusCode).toBe(500);
      expect(responseBody.status).toBe(expected.status);
      expect(responseBody.message).toBeDefined();
      expect(responseBody.message?.includes("Can't reach database server")).toBe(true);
    });
  });
  describe('Given something went wrong during getting all the cards', () => {
    it('should return an error', async () => {
      const expected = new Error('Error');

      jest.spyOn(CardService, 'getCards').mockRejectedValue(expected);

      const { statusCode, text } = await supertest(app).get('/api/v1/cards');

      expect(statusCode).toBe(500);
      expect(text).toStrictEqual(expected.message);
    });
  });
});
