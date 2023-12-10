import { get, patch, post, remove } from '../../lib/API/fetchApi';
import URL from '../../pages/utils/url';
import { Label, Card, ResJsonSuccess, ResJsonFail, ResJson } from '../../types';

const url = `${URL}/labels`;

export async function createLabel(body: object): Promise<Label> {
  const response = await post(url, body);
  const json: ResJsonSuccess | ResJsonFail = (await response.json()) as ResJson;
  if (json.status === 'success') {
    return json.data as Label;
  }
  throw new Error(json.message);
}

export async function getLabels(): Promise<Label[]> {
  const response = await get(url);
  const json: ResJsonSuccess | ResJsonFail = (await response.json()) as ResJson;
  if (json.status === 'success') {
    return json.data as Label[];
  }
  throw new Error(json.message);
}

export async function getLabel(id: string): Promise<Label> {
  const response = await get(`${url}/${id}`);
  const json: ResJsonSuccess | ResJsonFail = (await response.json()) as ResJson;
  if (json.status === 'success') {
    return json.data as Label;
  }
  throw new Error(json.message);
}

export async function getLabelCards(id: string): Promise<Card[]> {
  const response = await get(`${url}/${id}/cards`);
  const json: ResJsonSuccess | ResJsonFail = (await response.json()) as ResJson;
  if (json.status === 'success') {
    return json.data as Card[];
  }
  throw new Error(json.message);
}

export async function patchLabel(id: string, body: object): Promise<Label> {
  const response = await patch(`${url}/${id}`, body);
  const json: ResJsonSuccess | ResJsonFail = (await response.json()) as ResJson;
  if (json.status === 'success') {
    return json.data as Label;
  }
  throw new Error(json.message);
}

export async function deleteLabel(id: string): Promise<null> {
  const response = await remove(`${url}/${id}`);
  if (response.status === 204) {
    return null;
  }
  const json = (await response.json()) as ResJsonFail;

  throw new Error(json.message);
}
