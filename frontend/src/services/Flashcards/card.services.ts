import { get, patch, post, remove } from '../../lib/API/fetchApi';
import URL from '../../pages/utils/url';
import { Card, ResJsonSuccess, ResJsonFail, ResJson, Label } from '../../types';

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

export async function getCard(id: string): Promise<Card> {
  const response = await get(`${url}/${id}`);
  const json: ResJsonSuccess | ResJsonFail = (await response.json()) as ResJson;
  if (json.status === 'success') {
    return json.data as Card;
  }
  throw new Error(json.message);
}

export async function getCardLabels(id: string): Promise<Label[]> {
  const response = await get(`${url}/${id}/labels`);
  const json: ResJsonSuccess | ResJsonFail = (await response.json()) as ResJson;
  if (json.status === 'success') {
    return json.data as Label[];
  }
  throw new Error(json.message);
}

export async function patchCard(id: string, body: object): Promise<Card> {
  const response = await patch(`${url}/${id}`, body);
  const json: ResJsonSuccess | ResJsonFail = (await response.json()) as ResJson;
  if (json.status === 'success') {
    return json.data as Card;
  }
  throw new Error(json.message);
}

export async function deleteCard(id: string): Promise<null> {
  const response = await remove(`${url}/${id}`);
  if (response.status === 204) {
    return null;
  }
  const json: ResJsonFail = (await response.json()) as ResJsonFail;
  throw new Error(json.message);
}
