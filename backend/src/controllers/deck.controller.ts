import type { Request, Response } from 'express';

import {
  createDeck,
  deleteDeck,
  getDeck,
  getDeckCards,
  getDecks,
  patchDeck,
} from '../services/deck.service';
import type { Deck } from '../types/deck';

const addDeck = async (req: Request, res: Response) => {
  try {
    const { name, archived } = req.body as Deck;
    const { statusCode, ...queryResult } = await createDeck({ name, archived });
    return res.status(statusCode ?? 201).send(queryResult);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return res.status(500).send(errorMessage);
  }
};

const listDecks = async (_: Request, res: Response) => {
  try {
    const { statusCode, ...queryResult } = await getDecks();
    return res.status(statusCode ?? 200).send(queryResult);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return res.status(500).send(errorMessage);
  }
};

const listDeck = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { statusCode, ...queryResult } = await getDeck(id);
    return res.status(statusCode ?? 200).send(queryResult);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return res.status(500).send(errorMessage);
  }
};

const listDeckCards = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { statusCode, ...queryResult } = await getDeckCards(id);
    return res.status(statusCode ?? 200).send(queryResult);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return res.status(500).send(errorMessage);
  }
};

const updateDeck = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, archived } = req.body as Deck;
    const { statusCode, ...queryResult } = await patchDeck({ id, name, archived });
    return res.status(statusCode ?? 200).send(queryResult);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return res.status(500).send(errorMessage);
  }
};

const removeDeck = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { statusCode, ...queryResult } = await deleteDeck(id);
    if (statusCode) {
      return res.status(statusCode).send(queryResult);
    }
    return res.status(204).send();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return res.status(500).send(errorMessage);
  }
};

export { addDeck, listDecks, listDeck, listDeckCards, updateDeck, removeDeck };
