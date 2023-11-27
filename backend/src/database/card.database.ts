import { ICard } from '../models/interfaces.models';
import { ICreateCard, IPatchCard } from '../types/interfaces';
import prisma from '../utils/prismaClient.utils';

async function getLabelsFromDB(reqLabels: string[]) {
  const labels = await prisma.label.findMany({
    where: {
      labelName: { in: reqLabels },
    },
    include: { cards: { select: { card: { include: { labels: { select: { label: true } } } } } } },
  });
  return labels;
}

async function assignLabelsToCard(labels: string[], cardId: string) {
  const labelsToAssign = await getLabelsFromDB(labels);
  const cardLabels = labelsToAssign.map((label) => ({
    labelId: label.labelId,
    cardId,
  }));

  await prisma.labelsOnCards.createMany({ data: cardLabels, skipDuplicates: true });
}

async function removeLabelsFromCard(labels: string[], cardId: string) {
  const labelsToRemove = await getLabelsFromDB(labels);
  const labelsIds = labelsToRemove.map((label) => label.labelId);

  await prisma.labelsOnCards.deleteMany({ where: { cardId, labelId: { in: labelsIds } } });
}

const cardCreate = async ({ cardName, content, deckId, labels }: ICreateCard): Promise<ICard> => {
  let card = await prisma.card.create({
    data: {
      cardName,
      content,
      deckId,
    },
  });

  if (labels) {
    await assignLabelsToCard(labels, card.cardId);
    card = await prisma.card.findUniqueOrThrow({
      where: {
        cardId: card.cardId,
      },
      include: { labels: { select: { label: true } } },
    });
  }

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

const cardUpdate = async ({ cardId, cardName, labels }: IPatchCard): Promise<ICard> => {
  const card = await prisma.card.update({
    where: { cardId },
    include: { labels: { select: { label: true } } },
    data: {
      cardName,
    },
  });

  if (labels) {
    if (!labels.length) {
      await prisma.labelsOnCards.deleteMany({ where: { cardId: card.cardId } });
    }

    const labelsToRemove = card.labels.map((e) => e.label.labelName).filter((labelName) => !labels.includes(labelName));

    await removeLabelsFromCard(labelsToRemove, card.cardId);
    await assignLabelsToCard(labels, card.cardId);
  }

  return card as ICard;
};

const cardDelete = async (cardId: string) => {
  await prisma.card.delete({
    where: {
      cardId,
    },
  });
};

export { cardCreate, cardFind, cardFindMany, cardUpdate, cardDelete };
