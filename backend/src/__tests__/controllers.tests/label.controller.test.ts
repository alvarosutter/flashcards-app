import supertest from 'supertest';
import createServer from '../../utils/server.utils';
import * as LabelService from '../../services/label.service';
import { labelData } from '../helper.tests';
import IQueryResult from '../../types/queryResult';

const app = createServer();

describe('Add Label', () => {
  describe('Given all is working correctly', () => {
    it('should create a new label', async () => {
      const input = {
        name: 'my label',
      };
      const expected: IQueryResult = {
        status: 'success',
        data: { ...labelData, ...input },
      };
      const labelServiceMock = jest.spyOn(LabelService, 'createLabel').mockResolvedValueOnce(expected);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const { statusCode, body: responseBody } = await supertest(app).post('/api/v1/labels/').send(input);

      expect(statusCode).toBe(201);
      expect(JSON.stringify(responseBody)).toEqual(JSON.stringify(expected));
      expect(labelServiceMock).toHaveBeenCalled();
    });
  });
  describe('Given the server is not connected to the database', () => {
    it('should return an error', async () => {
      const input = {
        name: 'my label',
      };
      const expected: IQueryResult = {
        status: 'failure',
      };
      const labelServiceMock = jest.spyOn(LabelService, 'createLabel').mockRejectedValueOnce(expected);

      await supertest(app).post('/api/v1/labels/').send(input);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const { statusCode, body } = await supertest(app).post('/api/v1/labels/').send(input);

      const responseBody = body as IQueryResult;
      expect(statusCode).toBe(500);
      expect(responseBody.status).toBe(expected.status);
      expect(responseBody.message).toBeDefined();
      expect(responseBody.message?.includes("Can't reach database server")).toBe(true);
      expect(labelServiceMock).toHaveBeenCalled();
    });
  });
  describe('Given something went wrong during adding a new label', () => {
    it('should return an error', async () => {
      const input = {
        name: 'my label',
      };
      const expected = new Error('Error');

      const labelServiceMock = jest.spyOn(LabelService, 'createLabel').mockRejectedValue(expected);

      const { statusCode, text } = await supertest(app).post('/api/v1/labels/').send(input);

      expect(statusCode).toBe(500);
      expect(text).toStrictEqual(expected.message);
      expect(labelServiceMock).toHaveBeenCalled();
    });
  });
});

describe('List Label Cards', () => {
  describe('Given everything is working correctly', () => {
    it('should return the label', async () => {
      const id = '07d840a2-0dec-4fdb-862d-ccb3536fbde8';
      const expected: IQueryResult = {
        status: 'success',
        total: labelData.cards.length,
        data: labelData.cards,
      };

      const labelServiceMock = jest.spyOn(LabelService, 'getLabelCards').mockResolvedValueOnce(expected);

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const { statusCode, body: responseBody } = await supertest(app).get(`/api/v1/labels/${id}/cards`);

      expect(statusCode).toBe(200);
      expect(JSON.stringify(responseBody)).toEqual(JSON.stringify(expected));
      expect(labelServiceMock).toHaveBeenCalled();
    });
  });
  describe('Given the server is not connected to the database', () => {
    it('should return an error', async () => {
      const id = '07d840a2-0dec-4fdb-862d-ccb3536fbde8';
      const expected: IQueryResult = {
        status: 'failure',
      };

      jest.spyOn(LabelService, 'getLabelCards').mockRejectedValueOnce(expected);

      await supertest(app).get(`/api/v1/labels/${id}/cards`);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const { statusCode, body } = await supertest(app).get(`/api/v1/labels/${id}/cards`);

      const responseBody = body as IQueryResult;

      expect(statusCode).toBe(500);
      expect(statusCode).toBe(500);
      expect(responseBody.status).toBe(expected.status);
      expect(responseBody.message).toBeDefined();
      expect(responseBody.message?.includes("Can't reach database server")).toBe(true);
    });
  });
  describe('Given something went wrong during updating the label', () => {
    it('should return an error', async () => {
      const id = '07d840a2-0dec-4fdb-862d-ccb3536fbde8';
      const expected = new Error('Error');

      jest.spyOn(LabelService, 'getLabelCards').mockRejectedValueOnce(expected);

      const { statusCode, text } = await supertest(app).get(`/api/v1/labels/${id}/cards`);

      expect(statusCode).toBe(500);
      expect(text).toStrictEqual(expected.message);
    });
  });
});

describe('List Label', () => {
  describe('Given everything is working correctly', () => {
    it('should return the label', async () => {
      const id = '07d840a2-0dec-4fdb-862d-ccb3536fbde8';
      const expected: IQueryResult = {
        status: 'success',
        data: { ...labelData, id },
      };

      const labelServiceMock = jest.spyOn(LabelService, 'getLabel').mockResolvedValueOnce(expected);

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const { statusCode, body: responseBody } = await supertest(app).get(`/api/v1/labels/${id}`);

      expect(statusCode).toBe(200);
      expect(JSON.stringify(responseBody)).toEqual(JSON.stringify(expected));
      expect(labelServiceMock).toHaveBeenCalled();
    });
  });
  describe('Given the server is not connected to the database', () => {
    it('should return an error', async () => {
      const id = '07d840a2-0dec-4fdb-862d-ccb3536fbde8';
      const expected: IQueryResult = {
        status: 'failure',
      };

      jest.spyOn(LabelService, 'getLabel').mockRejectedValueOnce(expected);

      await supertest(app).get(`/api/v1/labels/${id}`);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const { statusCode, body } = await supertest(app).get(`/api/v1/labels/${id}`);

      const responseBody = body as IQueryResult;

      expect(statusCode).toBe(500);
      expect(statusCode).toBe(500);
      expect(responseBody.status).toBe(expected.status);
      expect(responseBody.message).toBeDefined();
      expect(responseBody.message?.includes("Can't reach database server")).toBe(true);
    });
  });
  describe('Given something went wrong during updating the label', () => {
    it('should return an error', async () => {
      const id = '07d840a2-0dec-4fdb-862d-ccb3536fbde8';
      const expected = new Error('Error');

      jest.spyOn(LabelService, 'getLabel').mockRejectedValueOnce(expected);

      const { statusCode, text } = await supertest(app).get(`/api/v1/labels/${id}`);

      expect(statusCode).toBe(500);
      expect(text).toStrictEqual(expected.message);
    });
  });
});

describe('Update Label', () => {
  describe('Given the input is valid', () => {
    it('should update the label data', async () => {
      const input = {
        id: '07d840a2-0dec-4fdb-862d-ccb3536fbde8',
        name: 'my label',
      };
      const expected: IQueryResult = {
        status: 'success',
        data: { ...labelData, ...input },
      };

      const labelServiceMock = jest.spyOn(LabelService, 'patchLabel').mockResolvedValueOnce(expected);

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const { statusCode, body: responseBody } = await supertest(app).patch(`/api/v1/labels/${input.id}`).send(input);

      expect(statusCode).toBe(200);
      expect(JSON.stringify(responseBody)).toEqual(JSON.stringify(expected));
      expect(labelServiceMock).toHaveBeenCalled();
    });
  });
  describe('Given the server is not connected to the database', () => {
    it('should return an error', async () => {
      const id = '07d840a2-0dec-4fdb-862d-ccb3536fbde8';
      const expected: IQueryResult = {
        status: 'failure',
      };

      jest.spyOn(LabelService, 'patchLabel').mockRejectedValueOnce(expected);

      await supertest(app).patch(`/api/v1/labels/${id}`);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const { statusCode, body } = await supertest(app).patch(`/api/v1/labels/${id}`);

      const responseBody = body as IQueryResult;

      expect(statusCode).toBe(500);
      expect(statusCode).toBe(500);
      expect(responseBody.status).toBe(expected.status);
      expect(responseBody.message).toBeDefined();
      expect(responseBody.message?.includes("Can't reach database server")).toBe(true);
    });
  });
  describe('Given something went wrong during updating the label', () => {
    it('should return an error', async () => {
      const id = '07d840a2-0dec-4fdb-862d-ccb3536fbde8';
      const expected = new Error('Error');

      jest.spyOn(LabelService, 'patchLabel').mockRejectedValueOnce(expected);

      const { statusCode, text } = await supertest(app).patch(`/api/v1/labels/${id}`);

      expect(statusCode).toBe(500);
      expect(text).toStrictEqual(expected.message);
    });
  });
});

describe('Remove Label', () => {
  describe('Given all is working correctly', () => {
    it('should delete the label', async () => {
      const id = '07d840a2-0dec-4fdb-862d-ccb3536fbde8';
      const expected: IQueryResult = {
        status: 'success',
      };

      jest.spyOn(LabelService, 'deleteLabel').mockResolvedValueOnce(expected);

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const { statusCode, body: responseBody } = await supertest(app).delete(`/api/v1/labels/${id}`);

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

      jest.spyOn(LabelService, 'deleteLabel').mockRejectedValueOnce(expected);

      await supertest(app).delete(`/api/v1/labels/${id}`);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const { statusCode, body } = await supertest(app).delete(`/api/v1/labels/${id}`);

      const responseBody = body as IQueryResult;

      expect(statusCode).toBe(500);
      expect(responseBody.status).toBe(expected.status);
      expect(responseBody.message).toBeDefined();
      expect(responseBody.message?.includes("Can't reach database server")).toBe(true);
    });
  });
  describe('Given something went wrong during removing the label', () => {
    it('should return an error', async () => {
      const id = '07d840a2-0dec-4fdb-862d-ccb3536fbde8';
      const expected = new Error('Error');

      jest.spyOn(LabelService, 'deleteLabel').mockRejectedValueOnce(expected);

      const { statusCode, text } = await supertest(app).delete(`/api/v1/labels/${id}`);

      expect(statusCode).toBe(500);
      expect(text).toStrictEqual(expected.message);
    });
  });
});

describe('List Labels', () => {
  describe('Given all is working correctly', () => {
    it('should return all the labels', async () => {
      const expected: IQueryResult = {
        status: 'success',
        total: 2,
        data: [labelData, labelData],
      };

      jest.spyOn(LabelService, 'getLabels').mockResolvedValueOnce(expected);

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const { statusCode, body: responseBody } = await supertest(app).get('/api/v1/labels/');

      expect(statusCode).toBe(200);
      expect(JSON.stringify(responseBody)).toEqual(JSON.stringify(expected));
    });
  });
  describe('Given the server is not connected to the database', () => {
    it('should return an error', async () => {
      const expected: IQueryResult = {
        status: 'failure',
      };

      jest.spyOn(LabelService, 'getLabels').mockRejectedValueOnce(expected);

      await supertest(app).get('/api/v1/labels/');
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const { statusCode, body } = await supertest(app).get('/api/v1/labels/');

      const responseBody = body as IQueryResult;

      expect(statusCode).toBe(500);
      expect(responseBody.status).toBe(expected.status);
      expect(responseBody.message).toBeDefined();
      expect(responseBody.message?.includes("Can't reach database server")).toBe(true);
    });
  });
  describe('Given something went wrong during getting all the labels', () => {
    it('should return an error', async () => {
      const expected = new Error('Error');

      jest.spyOn(LabelService, 'getLabels').mockRejectedValue(expected);

      const { statusCode, text } = await supertest(app).get('/api/v1/labels');

      expect(statusCode).toBe(500);
      expect(text).toStrictEqual(expected.message);
    });
  });
});
