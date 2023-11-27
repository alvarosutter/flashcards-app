import { labelCreate, labelDelete, labelFind, labelFindMany, labelUpdate } from '../database/label.database';
import { IPatchLabel, IQueryResult } from '../types/interfaces';
import { mapLabelCards } from '../utils/mapCards.utils';
import getPrismaError from '../utils/prismaError.utils';

const createLabel = async (labelName: string): Promise<IQueryResult> => {
  try {
    const newLabel = await labelCreate(labelName);

    return {
      status: 'success',
      data: newLabel,
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

const getLabel = async (labelId: string): Promise<IQueryResult> => {
  try {
    const label = await labelFind(labelId);

    return {
      status: 'success',
      data: {
        ...label,
        cards: mapLabelCards(label.cards),
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

const getLabelCards = async (labelId: string): Promise<IQueryResult> => {
  try {
    const { cards } = await labelFind(labelId);

    return {
      status: 'success',
      total: cards.map((element) => element.card).length,
      data: mapLabelCards(cards),
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

const getLabels = async (): Promise<IQueryResult> => {
  try {
    const labels = await labelFindMany();

    return {
      status: 'success',
      total: labels.length,
      data: labels.map((label) => ({
        ...label,
        cards: mapLabelCards(label.cards),
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

const patchLabel = async ({ labelId, labelName }: IPatchLabel): Promise<IQueryResult> => {
  try {
    const label = await labelUpdate({ labelId, labelName });

    return {
      status: 'success',
      data: {
        ...label,
        cards: mapLabelCards(label.cards),
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

const deleteLabel = async (id: string): Promise<IQueryResult> => {
  try {
    await labelDelete(id);
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

export { createLabel, getLabel, getLabels, getLabelCards, patchLabel, deleteLabel };
