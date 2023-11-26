import { Request, Response } from 'express';
import { IDeck } from '../models/interfaces.models';
import { createDeck, deleteDeck, getDeck, getDeckCards, getDecks, patchDeck } from '../services/deck.service';

const addDeck = async (req: Request, res: Response) => {
  try {
    const { deckName, archived } = req.body as IDeck;

    const { statusCode, ...queryResult } = await createDeck({ deckName, archived });
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
    const { deckId } = req.params;

    const { statusCode, ...queryResult } = await getDeck(deckId);
    return res.status(statusCode ?? 200).send(queryResult);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return res.status(500).send(errorMessage);
  }
};

const listDeckCards = async (req: Request, res: Response) => {
  try {
    const { deckId } = req.params;

    const { statusCode, ...queryResult } = await getDeckCards(deckId);
    return res.status(statusCode ?? 200).send(queryResult);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return res.status(500).send(errorMessage);
  }
};

const updateDeck = async (req: Request, res: Response) => {
  try {
    const { deckId } = req.params;
    const { deckName, archived } = req.body as IDeck;

    const { statusCode, ...queryResult } = await patchDeck({ deckId, deckName, archived });
    return res.status(statusCode ?? 200).send(queryResult);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return res.status(500).send(errorMessage);
  }
};

const removeDeck = async (req: Request, res: Response) => {
  try {
    const { deckId } = req.params;
    const { statusCode, ...queryResult } = await deleteDeck(deckId);
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
