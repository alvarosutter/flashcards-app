import type { Base } from './base';
import type { Card } from './card';

export type Deck = Base & {
  archived: boolean;
  cards: Array<Card>;
};

export type DecksArray = {
  array: Array<Deck>;
  set: React.Dispatch<React.SetStateAction<Array<Deck>>>;
  sort: (callback: (a: Deck, b: Deck) => number) => void;
};
