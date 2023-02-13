import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { generateToken } from '../middlewares/auth.middleware';
import getPrismaError from '../utils/prismaError.utils';

const prisma = new PrismaClient();

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { userName, email, password } = req.body;
    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await prisma.user.create({
      data: {
        userName,
        email,
        password: hashPassword,
      },
    });

    return res.status(200).send({
      status: 'success',
      data: {
        userId: newUser.userId,
        userName: newUser.userName,
        email: newUser.email,
        createdAt: newUser.createdAt,
        updatedAt: newUser.updatedAt,
      },
    });
  } catch (error) {
    const prismaError = getPrismaError(error);
    if (!req.body.password) prismaError.statusCode = 400;
    return res.status(prismaError.statusCode).send({
      status: 'failure',
      message: prismaError.message,
    });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).send({
        status: 'failure',
        message: 'invalid email or password',
      });
    }
    const passwordMatch = bcrypt.compareSync(password, user.password);

    if (!passwordMatch) {
      return res.status(401).send({
        status: 'failure',
        message: 'invalid email or password',
      });
    }

    const token: string = await generateToken({
      userId: String(user.userId),
    });

    return res
      .status(200)
      .cookie('sessionId', token, {
        secure: true,
        httpOnly: true,
        sameSite: 'none',
      })
      .send({
        status: 'success',
        data: {
          userId: user.userId,
          userName: user.userName,
          email: user.email,
        },
      });
  } catch (error) {
    const prismaError = getPrismaError(error);
    return res.status(prismaError.statusCode).send({
      status: 'failure',
      message: prismaError.message,
    });
  }
};
