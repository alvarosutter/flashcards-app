import { get, patch, post, remove } from '../../lib/fetchApi';
import { URL, Card, Deck, ResJsonFail, ResJsonMulti, ResJsonSingle } from './flashcardsUtils';

const url = `${URL}/decks`;

export async function createDeck(body: object): Promise<Deck> {
  const response = await post(url, body);
  const json: ResJsonSingle | ResJsonFail = await response.json();
  if (json.status === 'success') {
    return json.data as Deck;
  }
  throw new Error(json.message);
}

export async function getDecks(): Promise<Deck[]> {
  const response = await get(url);
  const json: ResJsonMulti | ResJsonFail = await response.json();
  if (json.status === 'success') {
    return json.data as Deck[];
  }
  throw new Error(json.message);
}

export async function getDeck(deckId: string): Promise<Deck> {
  const response = await get(`${url}/${deckId}`);
  const json: ResJsonSingle | ResJsonFail = await response.json();
  if (json.status === 'success') {
    return json.data as Deck;
  }
  throw new Error(json.message);
}

export async function getDeckCards(deckId: string): Promise<Card[]> {
  const response = await get(`${url}/${deckId}/cards`);
  const json: ResJsonMulti | ResJsonFail = await response.json();
  if (json.status === 'success') {
    return json.data as Card[];
  }
  throw new Error(json.message);
}

export async function patchDeck(deckId: string, body: object): Promise<Deck> {
  const response = await patch(`${url}/${deckId}`, body);
  const json: ResJsonSingle | ResJsonFail = await response.json();
  if (json.status === 'success') {
    return json.data as Deck;
  }
  throw new Error(json.message);
}

export async function deleteDeck(deckId: string): Promise<null> {
  const response = await remove(`${url}/${deckId}`);
  if (response.status === 204) {
    return null;
  }
  const json: ResJsonFail = await response.json();
  throw new Error(json.message);
}
