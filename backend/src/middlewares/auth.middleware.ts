import { PrismaClient } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import jwt, { SignOptions, VerifyOptions } from 'jsonwebtoken';

interface TokenPayload {
  userId: string;
}

export interface Token extends TokenPayload {
  iat: number;
  exp: number;
}

const prisma = new PrismaClient();

/**
 * Generates a token will be valid for 7 days and returns it.
 */
export const generateToken = async (payload: TokenPayload): Promise<string> => {
  const privateKey = String(process.env.PRIVATE_KEY);
  const signInOptions: SignOptions = {
    algorithm: 'RS256',
    expiresIn: '7d',
  };
  const token = jwt.sign(payload, privateKey, signInOptions);
  return token;
};

/**
 * Checks if the token is valid.
 */
export const verifyToken = async (token: string): Promise<string | jwt.Jwt | jwt.JwtPayload | null> => {
  try {
    const publicKey = String(process.env.PUBLIC_KEY);
    const verifyOptions: VerifyOptions = {
      algorithms: ['RS256'],
    };
    const decoded = jwt.verify(token, publicKey, verifyOptions);
    return decoded;
  } catch (error) {
    return null;
  }
};

/**
 * Checks if the user exist and is authorized.
 */
export const authentication = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.get('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).send({
        status: 'failure',
        message: 'invalid token',
      });
    }

    const decodedToken = (await verifyToken(token)) as Token;

    if (!decodedToken) {
      return res.status(401).json({
        status: 'failure',
        message: 'invalid token',
      });
    }

    // Check if user is in the database
    await prisma.user.findUniqueOrThrow({ where: { userId: decodedToken.userId } });

    req.token = decodedToken;

    return next();
  } catch (error) {
    return res.status(401).json({
      status: 'failure',
      message: 'failed to authenticate user',
    });
  }
};
