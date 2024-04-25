import type { Request, Response } from 'express';

import {
  createCard,
  deleteCard,
  getCard,
  getCardLabels,
  getCards,
  patchCard,
} from '../services/card.service';

const addCard = async (req: Request, res: Response) => {
  try {
    const { name, content, deckId, labels } = req.body as {
      name: string;
      content: string;
      deckId: string;
      labels: Array<string>;
    };
    const { statusCode, ...queryResult } = await createCard({ name, content, deckId, labels });
    return res.status(statusCode ?? 201).send(queryResult);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return res.status(500).send(errorMessage);
  }
};

const listCards = async (_: Request, res: Response) => {
  try {
    const { statusCode, ...queryResult } = await getCards();
    return res.status(statusCode ?? 200).send(queryResult);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return res.status(500).send(errorMessage);
  }
};

const listCard = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { statusCode, ...queryResult } = await getCard(id);
    return res.status(statusCode ?? 200).send(queryResult);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return res.status(500).send(errorMessage);
  }
};

const listCardLabels = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { statusCode, ...queryResult } = await getCardLabels(id);
    return res.status(statusCode ?? 200).send(queryResult);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return res.status(500).send(errorMessage);
  }
};

const updateCard = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, content, labels } = req.body as {
      name: string;
      content: string;
      deckId: string;
      labels: Array<string>;
    };
    const { statusCode, ...queryResult } = await patchCard({ id, name, content, labels });
    return res.status(statusCode ?? 200).send(queryResult);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return res.status(500).send(errorMessage);
  }
};

const removeCard = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { statusCode, ...queryResult } = await deleteCard(id);
    if (statusCode) {
      return res.status(statusCode).send(queryResult);
    }
    return res.status(204).send();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return res.status(500).send(errorMessage);
  }
};

export { addCard, listCard, listCardLabels, listCards, updateCard, removeCard };
