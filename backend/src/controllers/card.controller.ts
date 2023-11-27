import { Request, Response } from 'express';
import { createCard, deleteCard, getCard, getCardLabels, getCards, patchCard } from '../services/card.service';

const addCard = async (req: Request, res: Response) => {
  try {
    const { cardName, content, deckId, labels } = req.body as {
      cardName: string;
      content: string;
      deckId: string;
      labels: string[];
    };

    const { statusCode, ...queryResult } = await createCard({ cardName, content, deckId, labels });
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
    const { cardId } = req.params;

    const { statusCode, ...queryResult } = await getCard(cardId);
    return res.status(statusCode ?? 200).send(queryResult);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return res.status(500).send(errorMessage);
  }
};

const listCardLabels = async (req: Request, res: Response) => {
  try {
    const { cardId } = req.params;

    const { statusCode, ...queryResult } = await getCardLabels(cardId);
    return res.status(statusCode ?? 200).send(queryResult);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return res.status(500).send(errorMessage);
  }
};

const updateCard = async (req: Request, res: Response) => {
  try {
    const { cardId } = req.params;
    const { cardName, content, labels } = req.body as {
      cardName: string;
      content: string;
      deckId: string;
      labels: string[];
    };

    const { statusCode, ...queryResult } = await patchCard({ cardId, cardName, content, labels });
    return res.status(statusCode ?? 200).send(queryResult);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return res.status(500).send(errorMessage);
  }
};

const removeCard = async (req: Request, res: Response) => {
  try {
    const { cardId } = req.params;
    const { statusCode, ...queryResult } = await deleteCard(cardId);
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
