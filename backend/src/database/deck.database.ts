import { IDeck } from '../models/interfaces.models';
import { ICreateDeck, IPatchDeck } from '../types/interfaces';
import prisma from '../utils/prismaClient.utils';

const deckCreate = async ({ deckName, archived }: ICreateDeck): Promise<IDeck> => {
  const deck = await prisma.deck.create({
    data: {
      deckName,
      archived,
    },
  });
  return deck as IDeck;
};

const deckFind = async (deckId: string): Promise<IDeck> => {
  const deck = await prisma.deck.findUniqueOrThrow({
    where: {
      deckId,
    },
    include: { cards: { include: { labels: { select: { label: true } } } } },
  });
  return deck as IDeck;
};

const deckFindMany = async (): Promise<IDeck[]> => {
  const decks = await prisma.deck.findMany({
    include: { cards: { include: { labels: { select: { label: true } } } } },
  });
  return decks as IDeck[];
};

const deckUpdate = async ({ deckId, deckName, archived }: IPatchDeck): Promise<IDeck> => {
  const deck = await prisma.deck.update({
    where: { deckId },
    include: { cards: { include: { labels: { select: { label: true } } } } },
    data: {
      deckName,
      archived,
    },
  });
  return deck as IDeck;
};

const deckDelete = async (deckId: string) => {
  await prisma.deck.delete({
    where: {
      deckId,
    },
  });
};

export { deckCreate, deckFind, deckFindMany, deckUpdate, deckDelete };
