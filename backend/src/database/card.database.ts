import type { CreateCard, Card, PatchCard } from '../types/card';
import prisma from '../utils/prismaClient.utils';

const getLabelsFromDB = async (reqLabels: Array<string>) => {
  const labels = await prisma.label.findMany({
    where: {
      name: { in: reqLabels },
    },
    include: { cards: { select: { card: { include: { labels: { select: { label: true } } } } } } },
  });
  return labels;
};

const assignLabelsToCard = async (labels: Array<string>, cardId: string) => {
  const labelsToAssign = await getLabelsFromDB(labels);
  const cardLabels = labelsToAssign.map((label) => ({
    labelId: label.id,
    cardId,
  }));

  await prisma.labelsOnCards.createMany({ data: cardLabels, skipDuplicates: true });
};

const removeLabelsFromCard = async (labels: Array<string>, cardId: string) => {
  const labelsToRemove = await getLabelsFromDB(labels);
  const labelsIds = labelsToRemove.map((label) => label.id);

  await prisma.labelsOnCards.deleteMany({ where: { cardId, labelId: { in: labelsIds } } });
};

const cardCreate = async ({ name, content, deckId }: CreateCard): Promise<Card> => {
  const card = await prisma.card.create({
    data: {
      name,
      content,
      deckId,
    },
    include: { labels: { select: { label: true } } },
  });

  return card as Card;
};

const cardFind = async (id: string): Promise<Card> => {
  const card = await prisma.card.findUniqueOrThrow({
    where: {
      id,
    },
    include: { labels: { select: { label: true } } },
  });
  return card as Card;
};

const cardFindMany = async (): Promise<Array<Card>> => {
  const cards = await prisma.card.findMany({
    include: { labels: { select: { label: true } } },
  });
  return cards as Array<Card>;
};

const cardUpdate = async ({ id, name, content }: PatchCard): Promise<Card> => {
  const card = await prisma.card.update({
    where: { id },
    include: { labels: { select: { label: true } } },
    data: {
      name,
      content,
    },
  });

  return card as Card;
};

const cardDelete = async (id: string) => {
  await prisma.card.delete({
    where: {
      id,
    },
  });
};

export {
  cardCreate,
  cardFind,
  cardFindMany,
  cardUpdate,
  cardDelete,
  assignLabelsToCard,
  removeLabelsFromCard,
};
