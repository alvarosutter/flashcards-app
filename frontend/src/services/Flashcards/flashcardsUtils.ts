export const URL = (import.meta.env.VITE_API_URL as string) || 'http://localhost:4000';

export type Base = {
  createdAt: Date;
  updatedAt: Date;
};

export type Deck = Base & {
  deckId: string;
  deckName: string;
  archived: boolean;
  cards: Card[];
};

export type Card = Base & {
  cardId: string;
  cardName: string;
  content: string;
  deckId: string;
  labels: Label[];
};

export type Label = Base & {
  labelId: string;
  labelName: string;
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

export function isDeck(obj: Deck | Card | Label): obj is Deck {
  return 'deckName' in obj;
}
export function isCard(obj: Deck | Card | Label): obj is Card {
  return 'cardName' in obj;
}
export function isLabel(obj: Deck | Card | Label): obj is Label {
  return 'labelName' in obj;
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
      if (isDeck(a) && isDeck(b)) {
        return a.deckName.localeCompare(b.deckName);
      }
      if (isCard(a) && isCard(b)) {
        return a.cardName.localeCompare(b.cardName);
      }
      return (a as Label).labelName.localeCompare((b as Label).labelName);
    },
  },
  {
    label: 'Z to A',
    value: 'ZtoA',
    func: (a: Deck | Card | Label, b: Deck | Card | Label) => {
      if (isDeck(a) && isDeck(b)) {
        return b.deckName.localeCompare(a.deckName);
      }
      if (isCard(a) && isCard(b)) {
        return b.cardName.localeCompare(a.cardName);
      }
      return (b as Label).labelName.localeCompare((a as Label).labelName);
    },
  },
];
