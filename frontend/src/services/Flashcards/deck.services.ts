import { get, patch, post, remove } from '../../lib/API/fetchApi';
import { URL, Card, Deck, ResJson, ResJsonFail, ResJsonSuccess } from './flashcardsUtils';

const url = `${URL}/decks`;

export async function createDeck(body: object): Promise<Deck> {
  const response = await post(url, body);
  const json: ResJsonSuccess | ResJsonFail = (await response.json()) as ResJson;
  if (json.status === 'success') {
    return json.data as Deck;
  }
  throw new Error(json.message);
}

export async function getDecks(): Promise<Deck[]> {
  const response = await get(url);
  const json: ResJsonSuccess | ResJsonFail = (await response.json()) as ResJson;
  if (json.status === 'success') {
    return json.data as Deck[];
  }
  throw new Error(json.message);
}

export async function getDeck(deckId: string): Promise<Deck> {
  const response = await get(`${url}/${deckId}`);
  const json: ResJsonSuccess | ResJsonFail = (await response.json()) as ResJson;
  if (json.status === 'success') {
    return json.data as Deck;
  }
  throw new Error(json.message);
}

export async function getDeckCards(deckId: string): Promise<Card[]> {
  const response = await get(`${url}/${deckId}/cards`);
  const json: ResJsonSuccess | ResJsonFail = (await response.json()) as ResJson;
  if (json.status === 'success') {
    return json.data as Card[];
  }
  throw new Error(json.message);
}

export async function patchDeck(deckId: string, body: object): Promise<Deck> {
  const response = await patch(`${url}/${deckId}`, body);
  const json: ResJsonSuccess | ResJsonFail = (await response.json()) as ResJson;
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
  const json = (await response.json()) as ResJsonFail;
  throw new Error(json.message);
}
