import {
  deckCreate,
  deckDelete,
  deckFind,
  deckFindMany,
  deckUpdate,
} from '../database/deck.database';
import type { CreateDeck, PatchDeck } from '../types/deck';
import type IQueryResult from '../types/queryResult';
import { mapDeckCards } from '../utils/mapCards.utils';
import getPrismaError from '../utils/prismaError.utils';

const createDeck = async ({ name, archived }: CreateDeck): Promise<IQueryResult> => {
  try {
    const newDeck = await deckCreate({ name, archived });

    return {
      status: 'success',
      data: newDeck,
    };
  } catch (error) {
    const prismaError = getPrismaError(error);
    return {
      status: 'failure',
      message: prismaError.message,
      statusCode: prismaError.statusCode,
    };
  }
};

const getDeck = async (id: string): Promise<IQueryResult> => {
  try {
    const deck = await deckFind(id);

    return {
      status: 'success',
      data: {
        ...deck,
        cards: mapDeckCards(deck.cards),
      },
    };
  } catch (error) {
    const prismaError = getPrismaError(error);
    return {
      status: 'failure',
      message: prismaError.message,
      statusCode: prismaError.statusCode,
    };
  }
};

const getDeckCards = async (id: string): Promise<IQueryResult> => {
  try {
    const { cards } = await deckFind(id);

    return {
      status: 'success',
      total: cards.length,
      data: mapDeckCards(cards),
    };
  } catch (error) {
    const prismaError = getPrismaError(error);
    return {
      status: 'failure',
      message: prismaError.message,
      statusCode: prismaError.statusCode,
    };
  }
};

const getDecks = async (): Promise<IQueryResult> => {
  try {
    const decks = await deckFindMany();

    return {
      status: 'success',
      total: decks.length,
      data: decks.map((deck) => ({
        ...deck,
        cards: mapDeckCards(deck.cards),
      })),
    };
  } catch (error) {
    const prismaError = getPrismaError(error);
    return {
      status: 'failure',
      message: prismaError.message,
      statusCode: prismaError.statusCode,
    };
  }
};

const patchDeck = async ({ id, name, archived }: PatchDeck): Promise<IQueryResult> => {
  try {
    const deck = await deckUpdate({ id, name, archived });

    return {
      status: 'success',
      data: {
        ...deck,
        cards: mapDeckCards(deck.cards),
      },
    };
  } catch (error) {
    const prismaError = getPrismaError(error);
    return {
      status: 'failure',
      message: prismaError.message,
      statusCode: prismaError.statusCode,
    };
  }
};

const deleteDeck = async (id: string): Promise<IQueryResult> => {
  try {
    await deckDelete(id);
    return {
      status: 'success',
    };
  } catch (error) {
    const prismaError = getPrismaError(error);
    return {
      status: 'failure',
      message: prismaError.message,
      statusCode: prismaError.statusCode,
    };
  }
};

export { createDeck, getDeck, getDecks, getDeckCards, patchDeck, deleteDeck };
