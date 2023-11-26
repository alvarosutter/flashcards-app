import supertest from 'supertest';
import createServer from '../../utils/server.utils';

const app = createServer();

describe('Given the server is working', () => {
  it('should return a message from the API', async () => {
    const expected = { message: 'Hello Api' };

    jest.fn().mockReturnValueOnce(expected);
    const { statusCode, text } = await supertest(app).get('/api/v1');
    expect(statusCode).toBe(200);
    expect(text).toBe(JSON.stringify(expected));
  });
});
