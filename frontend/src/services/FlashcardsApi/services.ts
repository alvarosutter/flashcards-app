import axios from 'axios';
import { ResJson } from '../../types';

export async function get(url: string): Promise<ResJson> {
  try {
    const { data }: { data: ResJson } = await axios.get(url);
    return data;
  } catch (error: unknown) {
    return {
      status: 'failure',
      message: (error as Error).message,
    };
  }
}

export async function post(url: string, body: object): Promise<ResJson> {
  try {
    const { data }: { data: ResJson } = await axios.post(url, body);
    return data;
  } catch (error: unknown) {
    return {
      status: 'failure',
      message: (error as Error).message,
    };
  }
}

export async function put(url: string, body: object): Promise<ResJson> {
  try {
    const { data }: { data: ResJson } = await axios.put(url, body);
    return data;
  } catch (error: unknown) {
    return {
      status: 'failure',
      message: (error as Error).message,
    };
  }
}

export async function patch(url: string, body: object): Promise<ResJson> {
  try {
    const { data }: { data: ResJson } = await axios.patch(url, body);
    return data;
  } catch (error: unknown) {
    return {
      status: 'failure',
      message: (error as Error).message,
    };
  }
}

export async function remove(url: string): Promise<ResJson> {
  try {
    const { data }: { data: ResJson } = await axios.delete(url);
    return data;
  } catch (error: unknown) {
    return {
      status: 'failure',
      message: (error as Error).message,
    };
  }
}
