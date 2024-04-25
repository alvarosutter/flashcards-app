import {
  PrismaClientValidationError,
  PrismaClientUnknownRequestError,
  PrismaClientRustPanicError,
  PrismaClientKnownRequestError,
} from '@prisma/client/runtime/library';

import getPrismaError from '../../utils/prismaError.utils';

describe('Given something is wrong in the request', () => {
  it('should return a validation error', async () => {
    const error = new PrismaClientValidationError('missing field', {
      clientVersion: '5.13.0',
    });
    const expected = { message: 'missing field or incorrect field type provided', statusCode: 400 };

    jest.fn().mockReturnValueOnce(expected);
    const { message, statusCode } = getPrismaError(error);
    expect(statusCode).toBe(expected.statusCode);
    expect(message).toBe(expected.message);
  });
  it('should return a unknown request error', async () => {
    const error = new PrismaClientUnknownRequestError('unknown request', {
      clientVersion: '5.13.0',
    });
    const expected = { message: 'unknown request', statusCode: 400 };

    jest.fn().mockReturnValueOnce(expected);
    const { message, statusCode } = getPrismaError(error);
    expect(statusCode).toBe(expected.statusCode);
    expect(message).toBe(expected.message);
  });
  it('should return a client rust panic error', async () => {
    const error = new PrismaClientRustPanicError('client rust panic error', '2.19.0');
    const expected = { message: 'client rust panic error', statusCode: 500 };

    jest.fn().mockReturnValueOnce(expected);
    const { message, statusCode } = getPrismaError(error);
    expect(statusCode).toBe(expected.statusCode);
    expect(message).toBe(expected.message);
  });
  it('should return a known request error: unique constraint', async () => {
    const error = new PrismaClientKnownRequestError('unique constraint error', {
      clientVersion: '5.13.0',
      code: 'P2002',
    });
    const expected = { message: 'unique constraint error: unique field is empty', statusCode: 400 };

    jest.fn().mockReturnValueOnce(expected);
    const { message, statusCode } = getPrismaError(error);
    expect(statusCode).toBe(expected.statusCode);
    expect(message).toBe(expected.message);
  });
  it('should return a known request error: unique constraint missing', async () => {
    const error = new PrismaClientKnownRequestError('unique constraint error', {
      clientVersion: '5.13.0',
      code: 'P2002',
      meta: { target: ['email'] },
    });
    const expected = { message: 'unique constraint error: email', statusCode: 400 };

    jest.fn().mockReturnValueOnce(expected);
    const { message, statusCode } = getPrismaError(error);
    expect(statusCode).toBe(expected.statusCode);
    expect(message).toBe(expected.message);
  });
  it('should return a known request error: inconsistent column data', async () => {
    const error = new PrismaClientKnownRequestError('', {
      clientVersion: '5.13.0',
      code: 'P2023',
      meta: { target: ['email'] },
    });
    const expected = { message: 'undefined', statusCode: 400 };

    jest.fn().mockReturnValueOnce(expected);
    const { message, statusCode } = getPrismaError(error);
    expect(statusCode).toBe(expected.statusCode);
    expect(message).toBe(expected.message);
  });
  it('should return a known request error: not found', async () => {
    const error = new PrismaClientKnownRequestError('not found', {
      clientVersion: '5.13.0',
      code: 'P2025',
    });
    const expected = { message: 'not found', statusCode: 404 };

    jest.fn().mockReturnValueOnce(expected);
    const { message, statusCode } = getPrismaError(error);
    expect(statusCode).toBe(expected.statusCode);
    expect(message).toBe(expected.message);
  });
});
