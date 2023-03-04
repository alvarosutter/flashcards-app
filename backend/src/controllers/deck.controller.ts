import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import getPrismaError from '../utils/prismaError.utils';

const prisma = new PrismaClient();

export const createDeck = async (req: Request, res: Response) => {
  try {
    const { deckName, archived } = req.body;

    const newDeck = await prisma.deck.create({
      data: {
        deckName,
        archived,
      },
    });

    return res.status(201).send({
      status: 'success',
      data: newDeck,
    });
  } catch (error) {
    const prismaError = getPrismaError(error);
    return res.status(prismaError.statusCode).send({
      status: 'failure',
      message: prismaError.message,
    });
  }
};

export const getDecks = async (_: Request, res: Response) => {
  try {
    const decks = await prisma.deck.findMany({
      include: { cards: { include: { labels: { select: { label: true } } } } },
    });

    return res.status(200).send({
      status: 'success',
      data: decks.map((deck) => ({
        ...deck,
        cards: deck.cards.map((card) => ({ ...card, labels: card.labels.map((element) => element.label) })),
      })),
      total: decks.length,
    });
  } catch (error) {
    const prismaError = getPrismaError(error);
    return res.status(prismaError.statusCode).send({
      status: 'failure',
      message: prismaError.message,
    });
  }
};

export const getDeck = async (req: Request, res: Response) => {
  try {
    const { deckId } = req.params;

    const deck = await prisma.deck.findUniqueOrThrow({
      where: {
        deckId,
      },
      include: { cards: { include: { labels: { select: { label: true } } } } },
    });

    return res.status(200).send({
      status: 'success',
      data: {
        ...deck,
        cards: deck.cards.map((card) => ({ ...card, labels: card.labels.map((element) => element.label) })),
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

export const getDeckCards = async (req: Request, res: Response) => {
  try {
    const { deckId } = req.params;

    const deck = await prisma.deck.findUniqueOrThrow({
      where: {
        deckId,
      },
      include: { cards: { include: { labels: { select: { label: true } } } } },
    });

    return res.status(200).send({
      status: 'success',
      data: deck.cards.map((card) => ({ ...card, labels: card.labels.map((element) => element.label) })),
      total: deck.cards.length,
    });
  } catch (error) {
    const prismaError = getPrismaError(error);
    return res.status(prismaError.statusCode).send({
      status: 'failure',
      message: prismaError.message,
    });
  }
};

export const patchDeck = async (req: Request, res: Response) => {
  try {
    const { deckId } = req.params;
    const { deckName, archived } = req.body;

    const deck = await prisma.deck.update({
      where: {
        deckId,
      },
      include: { cards: { include: { labels: { select: { label: true } } } } },
      data: {
        deckName,
        archived,
      },
    });

    return res.status(200).send({
      status: 'success',
      data: {
        ...deck,
        cards: deck.cards.map((card) => ({ ...card, labels: card.labels.map((element) => element.label) })),
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

export const deleteDeck = async (req: Request, res: Response) => {
  try {
    const { deckId } = req.params;

    await prisma.deck.delete({
      where: {
        deckId,
      },
    });

    return res.status(204).send();
  } catch (error) {
    const prismaError = getPrismaError(error);
    return res.status(prismaError.statusCode).send({
      status: 'failure',
      message: prismaError.message,
    });
  }
};
