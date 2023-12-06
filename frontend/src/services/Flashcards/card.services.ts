import { get, patch, post, remove } from '../../lib/API/fetchApi';
import { URL, Label, Card, ResJson, ResJsonFail, ResJsonSuccess } from './flashcardsUtils';

const url = `${URL}/cards`;

export async function createCard(body: object): Promise<Card> {
  const response = await post(url, body);
  const json: ResJsonSuccess | ResJsonFail = (await response.json()) as ResJson;
  if (json.status === 'success') {
    return json.data as Card;
  }
  throw new Error(json.message);
}

export async function getCards(): Promise<Card[]> {
  const response = await get(url);
  const json: ResJsonSuccess | ResJsonFail = (await response.json()) as ResJson;
  if (json.status === 'success') {
    return json.data as Card[];
  }
  throw new Error(json.message);
}

export async function getCard(cardId: string): Promise<Card> {
  const response = await get(`${url}/${cardId}`);
  const json: ResJsonSuccess | ResJsonFail = (await response.json()) as ResJson;
  if (json.status === 'success') {
    return json.data as Card;
  }
  throw new Error(json.message);
}

export async function getCardLabels(cardId: string): Promise<Label[]> {
  const response = await get(`${url}/${cardId}/labels`);
  const json: ResJsonSuccess | ResJsonFail = (await response.json()) as ResJson;
  if (json.status === 'success') {
    return json.data as Label[];
  }
  throw new Error(json.message);
}

export async function patchCard(cardId: string, body: object): Promise<Card> {
  const response = await patch(`${url}/${cardId}`, body);
  const json: ResJsonSuccess | ResJsonFail = (await response.json()) as ResJson;
  if (json.status === 'success') {
    return json.data as Card;
  }
  throw new Error(json.message);
}

export async function deleteCard(cardId: string): Promise<null> {
  const response = await remove(`${url}/${cardId}`);
  if (response.status === 204) {
    return null;
  }
  const json: ResJsonFail = (await response.json()) as ResJsonFail;
  throw new Error(json.message);
}
