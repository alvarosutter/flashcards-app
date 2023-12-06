import { ICreateCard, ICard, IPatchCard } from '../types/card';
import prisma from '../utils/prismaClient.utils';

const getLabelsFromDB = async (reqLabels: string[]) => {
  const labels = await prisma.label.findMany({
    where: {
      labelName: { in: reqLabels },
    },
    include: { cards: { select: { card: { include: { labels: { select: { label: true } } } } } } },
  });
  return labels;
};

const assignLabelsToCard = async (labels: string[], cardId: string) => {
  const labelsToAssign = await getLabelsFromDB(labels);
  const cardLabels = labelsToAssign.map((label) => ({
    labelId: label.labelId,
    cardId,
  }));

  await prisma.labelsOnCards.createMany({ data: cardLabels, skipDuplicates: true });
};

const removeLabelsFromCard = async (labels: string[], cardId: string) => {
  const labelsToRemove = await getLabelsFromDB(labels);
  const labelsIds = labelsToRemove.map((label) => label.labelId);

  await prisma.labelsOnCards.deleteMany({ where: { cardId, labelId: { in: labelsIds } } });
};

const cardCreate = async ({ cardName, content, deckId }: ICreateCard): Promise<ICard> => {
  const card = await prisma.card.create({
    data: {
      cardName,
      content,
      deckId,
    },
    include: { labels: { select: { label: true } } },
  });

  return card as ICard;
};

const cardFind = async (cardId: string): Promise<ICard> => {
  const card = await prisma.card.findUniqueOrThrow({
    where: {
      cardId,
    },
    include: { labels: { select: { label: true } } },
  });
  return card as ICard;
};

const cardFindMany = async (): Promise<ICard[]> => {
  const cards = await prisma.card.findMany({
    include: { labels: { select: { label: true } } },
  });
  return cards as ICard[];
};

const cardUpdate = async ({ cardId, cardName }: IPatchCard): Promise<ICard> => {
  const card = await prisma.card.update({
    where: { cardId },
    include: { labels: { select: { label: true } } },
    data: {
      cardName,
    },
  });

  return card as ICard;
};

const cardDelete = async (cardId: string) => {
  await prisma.card.delete({
    where: {
      cardId,
    },
  });
};

export { cardCreate, cardFind, cardFindMany, cardUpdate, cardDelete, assignLabelsToCard, removeLabelsFromCard };
