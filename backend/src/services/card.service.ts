import {
  assignLabelsToCard,
  cardCreate,
  cardDelete,
  cardFind,
  cardFindMany,
  cardUpdate,
  removeLabelsFromCard,
} from '../database/card.database';
import { ICreateCard, IPatchCard } from '../types/card';
import IQueryResult from '../types/queryResult';
import mapLabels from '../utils/mapLabels.utils';
import getPrismaError from '../utils/prismaError.utils';

const createCard = async ({ name, content, deckId, labels }: ICreateCard): Promise<IQueryResult> => {
  try {
    let card = await cardCreate({ name, content, deckId });

    if (labels) {
      await assignLabelsToCard(labels, card.id);
      card = await cardFind(card.id);
    }

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

const getCard = async (id: string): Promise<IQueryResult> => {
  try {
    const card = await cardFind(id);

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

const getCardLabels = async (id: string): Promise<IQueryResult> => {
  try {
    const { labels } = await cardFind(id);
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

const patchCard = async ({ id, name, content, labels }: IPatchCard): Promise<IQueryResult> => {
  try {
    const card = await cardUpdate({ id, name, content });

    if (labels) {
      const labelsToRemove = card.labels.map((e) => e.label.name).filter((labelName) => !labels.includes(labelName));

      await removeLabelsFromCard(labelsToRemove, card.id);
      await assignLabelsToCard(labels, card.id);
    }

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
