import { Context } from './context';

interface RegisterUser {
  userName: string;
  email: string;
  password: string;
}

export async function registerUser(user: RegisterUser, ctx: Context) {
  const newUser = await ctx.prisma.user.create({
    data: user,
  });

  return newUser;
}

interface LoginUser {
  email: string;
  password: string;
}

export async function loginUser(user: LoginUser, ctx: Context) {
  const { email } = user;
  const foundUser = await ctx.prisma.user.findUnique({ where: { email } });

  return foundUser;
}
