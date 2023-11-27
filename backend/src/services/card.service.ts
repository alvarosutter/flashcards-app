import { cardCreate, cardDelete, cardFind, cardFindMany, cardUpdate } from '../database/card.database';
import { ICreateCard, IPatchCard, IQueryResult } from '../types/interfaces';
import mapLabels from '../utils/mapLabels.utils';
import getPrismaError from '../utils/prismaError.utils';

const createCard = async ({ cardName, content, deckId, labels }: ICreateCard): Promise<IQueryResult> => {
  try {
    const newCard = await cardCreate({ cardName, content, deckId, labels });

    return {
      status: 'success',
      data: newCard,
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

const getCard = async (cardId: string): Promise<IQueryResult> => {
  try {
    const card = await cardFind(cardId);

    return {
      status: 'success',
      data: {
        ...card,
        labels: mapLabels(card.labels),
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

const getCardLabels = async (cardId: string): Promise<IQueryResult> => {
  try {
    const { labels } = await cardFind(cardId);
    const cardLabels = mapLabels(labels);

    return {
      status: 'success',
      total: cardLabels.length,
      data: cardLabels,
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

const getCards = async (): Promise<IQueryResult> => {
  try {
    const cards = await cardFindMany();

    return {
      status: 'success',
      total: cards.length,
      data: cards.map((card) => ({
        ...card,
        labels: mapLabels(card.labels),
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

const patchCard = async ({ cardId, cardName, content, labels }: IPatchCard): Promise<IQueryResult> => {
  try {
    const card = await cardUpdate({ cardId, cardName, content, labels });

    return {
      status: 'success',
      data: {
        ...card,
        labels: mapLabels(card.labels),
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

const deleteCard = async (id: string): Promise<IQueryResult> => {
  try {
    await cardDelete(id);
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

export { createCard, getCard, getCards, getCardLabels, patchCard, deleteCard };
