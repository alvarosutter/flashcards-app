import type { Card } from './card';

type Deck = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  archived: boolean;
  cards: Array<Card>;
};

type CreateDeck = {
  name: string;
  archived: boolean;
};

type PatchDeck = {
  id: string;
  name: string;
  archived: boolean;
};

export { Deck, CreateDeck, PatchDeck };
