import { get, patch, post, remove } from '../../lib/API/fetchApi';
import URL from '../../pages/utils/url';
import { Deck, Card, ResJsonSuccess, ResJsonFail, ResJson } from '../../types';

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

export async function getDeck(id: string): Promise<Deck> {
  const response = await get(`${url}/${id}`);
  const json: ResJsonSuccess | ResJsonFail = (await response.json()) as ResJson;
  if (json.status === 'success') {
    return json.data as Deck;
  }
  throw new Error(json.message);
}

export async function getDeckCards(id: string): Promise<Card[]> {
  const response = await get(`${url}/${id}/cards`);
  const json: ResJsonSuccess | ResJsonFail = (await response.json()) as ResJson;
  if (json.status === 'success') {
    return json.data as Card[];
  }
  throw new Error(json.message);
}

export async function patchDeck(id: string, body: object): Promise<Deck> {
  const response = await patch(`${url}/${id}`, body);
  const json: ResJsonSuccess | ResJsonFail = (await response.json()) as ResJson;
  if (json.status === 'success') {
    return json.data as Deck;
  }
  throw new Error(json.message);
}

export async function deleteDeck(id: string): Promise<null> {
  const response = await remove(`${url}/${id}`);
  if (response.status === 204) {
    return null;
  }
  const json = (await response.json()) as ResJsonFail;
  throw new Error(json.message);
}
