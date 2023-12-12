import { get, patch, post, remove } from './services';
import URL from '../../utils/url';
import { Deck, Card } from '../../types';

const url = `${URL}/decks`;

export async function createDeck(body: object): Promise<Deck> {
  const response = await post(url, body);

  if (response.status === 'success') {
    return response.data as Deck;
  }
  throw new Error(response.message);
}

export async function getDecks(): Promise<Deck[]> {
  const response = await get(url);

  if (response.status === 'success') {
    return response.data as Deck[];
  }
  throw new Error(response.message);
}

export async function getDeck(id: string): Promise<Deck> {
  const response = await get(`${url}/${id}`);

  if (response.status === 'success') {
    return response.data as Deck;
  }
  throw new Error(response.message);
}

export async function getDeckCards(id: string): Promise<Card[]> {
  const response = await get(`${url}/${id}/cards`);

  if (response.status === 'success') {
    return response.data as Card[];
  }
  throw new Error(response.message);
}

export async function patchDeck(id: string, body: object): Promise<Deck> {
  const response = await patch(`${url}/${id}`, body);

  if (response.status === 'success') {
    return response.data as Deck;
  }
  throw new Error(response.message);
}

export async function deleteDeck(id: string): Promise<void> {
  const response = await remove(`${url}/${id}`);

  if (response.status === 'failure') {
    throw new Error(response.message);
  }
}
