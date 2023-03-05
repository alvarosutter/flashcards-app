import { get, patch, post, remove } from '../../lib/API/fetchApi';
import { URL, Card, Label, ResJsonFail, ResJsonMulti, ResJsonSingle } from './flashcardsUtils';

const url = `${URL}/labels`;

export async function createLabel(body: object): Promise<Label> {
  const response = await post(url, body);
  const json: ResJsonSingle | ResJsonFail = await response.json();
  if (json.status === 'success') {
    return json.data as Label;
  }
  throw new Error(json.message);
}

export async function getLabels(): Promise<Label[]> {
  const response = await get(url);
  const json: ResJsonMulti | ResJsonFail = await response.json();
  if (json.status === 'success') {
    return json.data as Label[];
  }
  throw new Error(json.message);
}

export async function getLabel(labelId: string): Promise<Label> {
  const response = await get(`${url}/${labelId}`);
  const json: ResJsonSingle | ResJsonFail = await response.json();
  if (json.status === 'success') {
    return json.data as Label;
  }
  throw new Error(json.message);
}

export async function getLabelCards(labelId: string): Promise<Card[]> {
  const response = await get(`${url}/${labelId}/cards`);
  const json: ResJsonMulti | ResJsonFail = await response.json();
  if (json.status === 'success') {
    return json.data as Card[];
  }
  throw new Error(json.message);
}

export async function patchLabel(labelId: string, body: object): Promise<Label> {
  const response = await patch(`${url}/${labelId}`, body);
  const json: ResJsonSingle | ResJsonFail = await response.json();
  if (json.status === 'success') {
    return json.data as Label;
  }
  throw new Error(json.message);
}

export async function deleteLabel(labelId: string): Promise<null> {
  const response = await remove(`${url}/${labelId}`);
  if (response.status === 204) {
    return null;
  }
  const json: ResJsonFail = await response.json();
  throw new Error(json.message);
}
