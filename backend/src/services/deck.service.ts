import { deckCreate, deckDelete, deckFind, deckFindMany, deckUpdate } from '../database/deck.database';
import { ICreateDeck, IPatchDeck, IQueryResult } from '../types/interfaces';
import getPrismaError from '../utils/prismaError.utils';

const createDeck = async ({ deckName, archived }: ICreateDeck): Promise<IQueryResult> => {
  try {
    const newDeck = await deckCreate({ deckName, archived });

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

const getDeck = async (deckId: string): Promise<IQueryResult> => {
  try {
    const deck = await deckFind(deckId);

    return {
      status: 'success',
      data: deck,
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

const getDeckCards = async (deckId: string): Promise<IQueryResult> => {
  try {
    const deck = await deckFind(deckId);

    return {
      status: 'success',
      total: deck.cards.length,
      data: deck.cards,
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
      data: decks,
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

const patchDeck = async ({ deckId, deckName, archived }: IPatchDeck): Promise<IQueryResult> => {
  try {
    const deck = await deckUpdate({ deckId, deckName, archived });

    return {
      status: 'success',
      data: deck,
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
