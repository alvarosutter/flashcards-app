import type { Card } from './card';
import type { Deck } from './deck';
import type { Label } from './label';

export type ResJsonFail = {
  status: 'failure';
  message: string;
};

export type ResJsonSuccess = {
  status: 'success';
  data: Array<Deck | Card | Label> | Deck | Card | Label;
};

export type ResJson = ResJsonFail | ResJsonSuccess;
