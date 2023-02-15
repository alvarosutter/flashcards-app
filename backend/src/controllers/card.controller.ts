import { Request, Response } from 'express';
import { Card, Label, PrismaClient } from '@prisma/client';
import getPrismaError from '../utils/prismaError.utils';

const prisma = new PrismaClient();

/**
 * Creates labels (if new) using the labels names send by the client
 * @param labels Array with the name of the labels
 * @param userId ID of the user creating the labels
 * @returns A Promise with a Label array
 */
async function createLabels(labels: string[], userId: string): Promise<Label[]> {
  // Creates an array with label objects
  const typedLabels = labels.map((labelName: string) => ({
    labelName,
    userId,
  }));
  // Creates new labels if they do not exist already
  await prisma.label.createMany({ data: typedLabels, skipDuplicates: true });
  const dbLabels = await prisma.label.findMany({
    where: {
      labelName: { in: labels },
    },
  });

  return dbLabels;
}

/**
 * Assigns labels to a card
 * @param labels Array with the labels that should be assigned
 * @param cardId ID of the card to which the labels should be assigned
 */
async function assignLabels(labels: Label[], cardId: string): Promise<void> {
  const cardLabels = labels.map((cardLabel) => ({
    labelId: cardLabel.labelId,
    cardId,
  }));
  // Assign labels to card
  await prisma.labelsOnCards.createMany({ data: cardLabels });
}

/**
 * Removes all labels assign to a card.
 * @param cardId ID of the card which labels should be removed.
 */
async function removeCardLabels(cardId: string): Promise<void> {
  await prisma.labelsOnCards.deleteMany({ where: { cardId } });
}

/**
 * Compares the given card labels with the current ones
 * @param typedLabels Array with the names of the labels
 * @param card Card to which the labels should be assign or remove
 */
async function checkLabels(typedLabels: string[], card: Card, currentLabels: Label[]): Promise<void> {
  // Gets the current card labels
  const currentLabelsNames = currentLabels.map((label) => label.labelName);
  // Compares the current labels with the new ones
  const labelsToAssign = typedLabels.filter((label) => !currentLabelsNames.includes(label));
  const labelsToRemove = currentLabelsNames.filter((label) => !typedLabels.includes(label));
  // Assign new labels
  await assignLabels(await createLabels(labelsToAssign, card.userId), card.cardId);
  // Remove labels
  await prisma.labelsOnCards.deleteMany({
    where: {
      cardId: card.cardId,
      labelId: {
        in: currentLabels.filter((label) => labelsToRemove.includes(label.labelName)).map((label) => label.labelId),
      },
    },
  });
}

export const createCard = async (req: Request, res: Response) => {
  try {
    const { cardName, content, labels, deckId } = req.body;
    const { userId } = req.token!;

    const newCard = await prisma.card.create({
      data: {
        cardName,
        content,
        deckId,
        userId,
      },
    });

    if (labels) {
      const typedLabels = labels as string[];
      // Create labels if they do not exist
      const dbLabels = await createLabels(typedLabels, userId);
      // Assign the labels to the card
      await assignLabels(dbLabels, newCard.cardId);
    }

    const card = await prisma.card.findUniqueOrThrow({
      where: {
        userId_cardId: {
          userId,
          cardId: newCard.cardId,
        },
      },
      include: { labels: { select: { label: true } } },
    });

    return res.status(201).send({
      status: 'success',
      data: {
        ...card,
        labels: card.labels.map((element) => element.label),
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

export const getCards = async (req: Request, res: Response) => {
  try {
    const { userId } = req.token!;
    const cards = await prisma.card.findMany({
      where: { userId },
      include: { labels: { select: { label: true } } },
    });

    return res.status(200).send({
      status: 'success',
      data: cards.map((card) => ({ ...card, labels: card.labels.map((element) => element.label) })),
      total: cards.length,
    });
  } catch (error) {
    const prismaError = getPrismaError(error);
    return res.status(prismaError.statusCode).send({
      status: 'failure',
      message: prismaError.message,
    });
  }
};

export const getCard = async (req: Request, res: Response) => {
  try {
    const { cardId } = req.params;
    const { userId } = req.token!;

    const card = await prisma.card.findUniqueOrThrow({
      where: {
        userId_cardId: {
          userId,
          cardId,
        },
      },
      include: { labels: { select: { label: true } } },
    });

    return res.status(200).send({
      status: 'success',
      data: {
        ...card,
        labels: card.labels.map((element) => element.label),
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

export const getCardLabels = async (req: Request, res: Response) => {
  try {
    const { cardId } = req.params;
    const { userId } = req.token!;

    const card = await prisma.card.findUniqueOrThrow({
      where: {
        userId_cardId: {
          userId,
          cardId,
        },
      },
      include: { labels: { select: { label: true } } },
    });

    return res.status(200).send({
      status: 'success',
      data: card.labels.map((element) => element.label),
      total: card.labels.map((element) => element.label).length,
    });
  } catch (error) {
    const prismaError = getPrismaError(error);
    return res.status(prismaError.statusCode).send({
      status: 'failure',
      message: prismaError.message,
    });
  }
};

export const patchCard = async (req: Request, res: Response) => {
  try {
    const { cardId } = req.params;
    const { cardName, content, labels, deckId } = req.body;
    const { userId } = req.token!;

    const card = await prisma.card.update({
      where: {
        userId_cardId: {
          userId,
          cardId,
        },
      },
      include: { labels: { select: { label: true } } },
      data: {
        cardName,
        content,
        deckId,
      },
    });

    if (!labels) {
      removeCardLabels(cardId);
    }
    if (labels) {
      const typedLabels = labels as string[];
      // Compare given labels with current ones
      await checkLabels(
        typedLabels,
        card,
        card.labels.map((element) => element.label),
      );
    }

    const patchedCard = await prisma.card.findUniqueOrThrow({
      where: {
        userId_cardId: {
          userId,
          cardId,
        },
      },
      include: { labels: { select: { label: true } } },
    });

    return res.status(200).send({
      status: 'success',
      data: {
        ...patchedCard,
        labels: patchedCard.labels.map((element) => element.label),
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

export const deleteCard = async (req: Request, res: Response) => {
  try {
    const { cardId } = req.params;
    const { userId } = req.token!;

    await prisma.card.delete({
      where: {
        userId_cardId: {
          userId,
          cardId,
        },
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