import type { Card } from '../types/card';
import type { Deck } from '../types/deck';
import type { Label } from '../types/label';
import type LabelsOnCards from '../types/labelOnCards';

const date = new Date();

export const labelsOnCardsData: LabelsOnCards = {
  card: {
    id: '9dbaccb9-cab7-4846-9122-d005fd53755c',
    createdAt: date,
    updatedAt: date,
    name: 'my first card',
    content: 'this is my first card',
    deckId: '07d840a2-0dec-4fdb-862d-ccb3536fbde8',
    labels: [],
  },
  cardId: '9dbaccb9-cab7-4846-9122-d005fd53755c',
  label: {
    id: '5d332513-6d80-4457-b799-bd1cbcf68f25',
    createdAt: date,
    updatedAt: date,
    name: 'my first card',
    cards: [],
  },
  labelId: '5d332513-6d80-4457-b799-bd1cbcf68f25',
};

export const cardData: Card = {
  id: '9dbaccb9-cab7-4846-9122-d005fd53755c',
  createdAt: date,
  updatedAt: date,
  name: 'my first card',
  content: 'this is my first card',
  deckId: '07d840a2-0dec-4fdb-862d-ccb3536fbde8',
  labels: [labelsOnCardsData],
};

export const labelData: Label = {
  id: '5d332513-6d80-4457-b799-bd1cbcf68f25',
  createdAt: date,
  updatedAt: date,
  name: 'my first card',
  cards: [labelsOnCardsData],
};

export const deckData: Deck = {
  id: '07d840a2-0dec-4fdb-862d-ccb3536fbde8',
  createdAt: date,
  updatedAt: date,
  name: 'my first deck',
  archived: false,
  cards: [cardData],
};
