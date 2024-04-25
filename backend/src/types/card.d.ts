import type LabelsOnCards from './labelOnCards';

type Card = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  content: string;
  deckId: string;
  labels: Array<LabelsOnCards>;
};

type CreateCard = {
  name: string;
  content: string;
  deckId: string;
  labels?: Array<string>;
};

type PatchCard = {
  id: string;
  name: string;
  content: string;
  labels?: Array<string>;
};

export { Card, CreateCard, PatchCard };
