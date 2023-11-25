import { Prisma } from '@prisma/client';

interface IPrismaError {
  message: string;
  statusCode: number;
}

function getPrismaError(error: unknown): IPrismaError {
  const prismaError: IPrismaError = {
    message: String(error),
    statusCode: 500,
  };

  if (error instanceof Prisma.PrismaClientValidationError) {
    prismaError.message = 'missing field or incorrect field type provided';
    prismaError.statusCode = 400;
  }
  if (error instanceof Prisma.PrismaClientUnknownRequestError) {
    prismaError.message = error.message;
    prismaError.statusCode = 400;
  }
  if (error instanceof Prisma.PrismaClientRustPanicError) {
    prismaError.message = error.message;
    prismaError.statusCode = 500;
  }
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    const errorCode = error.code;
    prismaError.statusCode = 400;
    if (errorCode === 'P2002') {
      prismaError.message = 'unique constraint error'.concat(
        ': ',
        [error.meta?.target].join('') || 'unique field is empty',
      );
    }
    if (errorCode === 'P2023') {
      prismaError.message = String(error.meta?.message);
    }
    if (errorCode === 'P2025') {
      prismaError.message = 'not found';
      prismaError.statusCode = 404;
    }
  }

  return prismaError;
}

export default getPrismaError;
