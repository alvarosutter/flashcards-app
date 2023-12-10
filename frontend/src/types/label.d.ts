import { Base } from './base';
// eslint-disable-next-line import/no-cycle
import { Card } from './card';

export type Label = Base & {
  cards: Card[];
};
