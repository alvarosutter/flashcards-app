import { Base } from './base';
import { Card } from './card';

export type Deck = Base & {
  archived: boolean;
  cards: Card[];
};
