import type { Base } from './base';
import type { Label } from './label';

export type Card = Base & {
  content: string;
  deckId: string;
  labels: Array<Label>;
};
