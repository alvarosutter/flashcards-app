import { ICreateDeck, IDeck, IPatchDeck } from '../types/deck';
import prisma from '../utils/prismaClient.utils';

const deckCreate = async ({ name, archived }: ICreateDeck): Promise<IDeck> => {
  const deck = await prisma.deck.create({
    data: {
      name,
      archived,
    },
  });
  return deck as IDeck;
};

const deckFind = async (id: string): Promise<IDeck> => {
  const deck = await prisma.deck.findUniqueOrThrow({
    where: {
      id,
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

const deckUpdate = async ({ id, name, archived }: IPatchDeck): Promise<IDeck> => {
  const deck = await prisma.deck.update({
    where: { id },
    include: { cards: { include: { labels: { select: { label: true } } } } },
    data: {
      name,
      archived,
    },
  });
  return deck as IDeck;
};

const deckDelete = async (id: string) => {
  await prisma.deck.delete({
    where: {
      id,
    },
  });
};

export { deckCreate, deckFind, deckFindMany, deckUpdate, deckDelete };
