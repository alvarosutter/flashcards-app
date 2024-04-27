import type { Base } from './base';
import type { Card } from './card';

export type Label = Base & {
  cards: Array<Card>;
};
