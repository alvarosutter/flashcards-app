import { Base } from './base';
import { Card } from './card';

export type Deck = Base & {
  archived: boolean;
  cards: Card[];
};

export type DecksArray = {
  array: Deck[];
  set: React.Dispatch<React.SetStateAction<Deck[]>>;
  sort: (callback: (a: Deck, b: Deck) => number) => void;
};
