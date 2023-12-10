import { Deck } from './deck';
import { Label } from './label';
import { Card } from './card';

export type ResJsonFail = {
  status: 'failure';
  message: string;
};

export type ResJsonSuccess = {
  status: 'success';
  data: Array<Deck | Card | Label> | Deck | Card | Label;
};

export type ResJson = ResJsonFail | ResJsonSuccess;
