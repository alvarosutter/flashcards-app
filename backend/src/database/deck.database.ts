import type { CreateDeck, Deck, PatchDeck } from '../types/deck';
import prisma from '../utils/prismaClient.utils';

const deckCreate = async ({ name, archived }: CreateDeck): Promise<Deck> => {
  const deck = await prisma.deck.create({
    data: {
      name,
      archived,
    },
  });
  return deck as Deck;
};

const deckFind = async (id: string): Promise<Deck> => {
  const deck = await prisma.deck.findUniqueOrThrow({
    where: {
      id,
    },
    include: { cards: { include: { labels: { select: { label: true } } } } },
  });
  return deck as Deck;
};

const deckFindMany = async (): Promise<Array<Deck>> => {
  const decks = await prisma.deck.findMany({
    include: { cards: { include: { labels: { select: { label: true } } } } },
  });
  return decks as Array<Deck>;
};

const deckUpdate = async ({ id, name, archived }: PatchDeck): Promise<Deck> => {
  const deck = await prisma.deck.update({
    where: { id },
    include: { cards: { include: { labels: { select: { label: true } } } } },
    data: {
      name,
      archived,
    },
  });
  return deck as Deck;
};

const deckDelete = async (id: string) => {
  await prisma.deck.delete({
    where: {
      id,
    },
  });
};

export { deckCreate, deckFind, deckFindMany, deckUpdate, deckDelete };
