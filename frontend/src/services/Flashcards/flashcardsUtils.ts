export const URL = (import.meta.env.VITE_API_URL as string) || 'http://localhost:4000/api/v1';

export type Base = {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Deck = Base & {
  archived: boolean;
  cards: Card[];
};

export type Card = Base & {
  content: string;
  deckId: string;
  labels: Label[];
};

export type Label = Base & {
  cards: Card[];
};

export type ResJsonFail = {
  status: 'failure';
  message: string;
};

export type ResJsonSuccess = {
  status: 'success';
  data: Array<Deck | Card | Label> | Deck | Card | Label;
};

export type ResJson = ResJsonFail | ResJsonSuccess;

export function isDeck(obj: Deck | Card | Label) {
  return 'archived' in obj;
}
export function isCard(obj: Deck | Card | Label) {
  return 'content' in obj;
}
export function isLabel(obj: Deck | Card | Label) {
  return !('archived' in obj) && !('content' in obj);
}

export const sortOptions = [
  {
    label: 'Newest',
    value: 'newest',
    func: (a: Deck | Card | Label, b: Deck | Card | Label) =>
      new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
  },
  {
    label: 'Oldest',
    value: 'oldest',
    func: (a: Deck | Card | Label, b: Deck | Card | Label) =>
      new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime(),
  },
  {
    label: 'A to Z',
    value: 'AtoZ',
    func: (a: Deck | Card | Label, b: Deck | Card | Label) => {
      return a.name.localeCompare(b.name);
    },
  },
  {
    label: 'Z to A',
    value: 'ZtoA',
    func: (a: Deck | Card | Label, b: Deck | Card | Label) => {
      return b.name.localeCompare(a.name);
    },
  },
];
