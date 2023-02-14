import { Prisma } from '@prisma/client';

interface PrismaError {
  message: string;
  statusCode: number;
}

function getPrismaError(error: unknown): PrismaError {
  const prismaError: PrismaError = {
    message: String(error),
    statusCode: 500,
  };

  if (error instanceof Prisma.PrismaClientValidationError) {
    prismaError.message = 'Missing field or Incorrect field type provided';
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
  if (error instanceof Prisma.NotFoundError) {
    prismaError.message = error.message;
    prismaError.statusCode = 404;
  }
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    const errorCode = error.code;
    prismaError.statusCode = 400;
    if (errorCode === 'P2002') {
      prismaError.message = 'Unique Constraint Error'.concat(
        ': ',
        [error.meta?.target].join('') || 'unique field is empty',
      );
    }
    if (errorCode === 'P2023') {
      prismaError.message = String(error.meta?.message);
    }
    if (errorCode === 'P2025') {
      prismaError.message = String(error.meta?.cause);
      prismaError.statusCode = 404;
    }
  }

  return prismaError;
}

export default getPrismaError;
