import { Base } from './base';
// eslint-disable-next-line import/no-cycle
import { Label } from './label';

export type Card = Base & {
  content: string;
  deckId: string;
  labels: Label[];
};
