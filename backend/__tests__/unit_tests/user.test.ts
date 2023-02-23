import { MockContext, Context, createMockContext } from './context';
import { loginUser, registerUser } from './helper';

let mockCtx: MockContext;
let ctx: Context;

beforeEach(() => {
  mockCtx = createMockContext();
  ctx = mockCtx as unknown as Context;
});

describe('register user', () => {
  it('should create a new user', async () => {
    const user = {
      userId: '1',
      userName: 'Test',
      email: 'test@jest.com',
      password: 'pass',
      createdAt: new Date('August 19, 1993 02:15:30'),
      updatedAt: new Date('August 19, 1993 02:15:30'),
    };
    mockCtx.prisma.user.create.mockResolvedValue(user);

    await expect(registerUser(user, ctx)).resolves.toEqual({
      userId: '1',
      userName: 'Test',
      email: 'test@jest.com',
      password: 'pass',
      createdAt: new Date('August 19, 1993 02:15:30'),
      updatedAt: new Date('August 19, 1993 02:15:30'),
    });
  });
});

describe('login user', () => {
  it('should log user', async () => {
    const user = {
      userId: '1',
      userName: 'Test',
      email: 'test@jest.com',
      password: 'pass',
      createdAt: new Date('August 19, 1993 02:15:30'),
      updatedAt: new Date('August 19, 1993 02:15:30'),
    };
    mockCtx.prisma.user.findUnique.mockResolvedValue(user);

    await expect(loginUser(user, ctx)).resolves.toEqual({
      userId: '1',
      userName: 'Test',
      email: 'test@jest.com',
      password: 'pass',
      createdAt: new Date('August 19, 1993 02:15:30'),
      updatedAt: new Date('August 19, 1993 02:15:30'),
    });
  });
});
