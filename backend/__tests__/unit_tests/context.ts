import { PrismaClient } from '@prisma/client';
import { mockDeep, DeepMockProxy } from 'jest-mock-extended';

/* Context will be used to run a scenario query */
export type Context = {
  prisma: PrismaClient;
};

/* MockContext will be used to make a mock call to Prisma */
export type MockContext = {
  prisma: DeepMockProxy<PrismaClient>;
};

export const createMockContext = (): MockContext => {
  return {
    prisma: mockDeep<PrismaClient>(),
  };
};
