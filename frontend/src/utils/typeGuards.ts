import { Card, Deck, Label } from '../types';

export function isDeck(obj: Deck | Card | Label) {
  return 'archived' in obj;
}

export function isCard(obj: Deck | Card | Label) {
  return 'content' in obj;
}
export function isLabel(obj: Deck | Card | Label) {
  return !('archived' in obj) && !('content' in obj);
}
