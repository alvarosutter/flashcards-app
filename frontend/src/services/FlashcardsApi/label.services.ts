import { get, patch, post, remove } from './services';
import URL from '../../utils/url';
import { Label, Card } from '../../types';

const url = `${URL}/labels`;

export async function createLabel(body: object): Promise<Label> {
  const response = await post(url, body);

  if (response.status === 'success') {
    return response.data as Label;
  }
  throw new Error(response.message);
}

export async function getLabels(): Promise<Label[]> {
  const response = await get(url);

  if (response.status === 'success') {
    return response.data as Label[];
  }
  throw new Error(response.message);
}

export async function getLabel(id: string): Promise<Label> {
  const response = await get(`${url}/${id}`);

  if (response.status === 'success') {
    return response.data as Label;
  }
  throw new Error(response.message);
}

export async function getLabelCards(id: string): Promise<Card[]> {
  const response = await get(`${url}/${id}/cards`);

  if (response.status === 'success') {
    return response.data as Card[];
  }
  throw new Error(response.message);
}

export async function patchLabel(id: string, body: object): Promise<Label> {
  const response = await patch(`${url}/${id}`, body);

  if (response.status === 'success') {
    return response.data as Label;
  }
  throw new Error(response.message);
}

export async function deleteLabel(id: string): Promise<void> {
  const response = await remove(`${url}/${id}`);

  if (response.status === 'failure') {
    throw new Error(response.message);
  }
}
