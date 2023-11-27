import { ICard, IDeck, ILabel, ILabelsOnCards } from '../models/interfaces.models';

const date = new Date();

export const labelsOnCardsData: ILabelsOnCards = {
  card: {
    cardId: '9dbaccb9-cab7-4846-9122-d005fd53755c',
    createdAt: date,
    updatedAt: date,
    cardName: 'my first card',
    content: 'this is my first card',
    deckId: '07d840a2-0dec-4fdb-862d-ccb3536fbde8',
    labels: [],
  },
  cardId: '9dbaccb9-cab7-4846-9122-d005fd53755c',
  label: {
    labelId: '5d332513-6d80-4457-b799-bd1cbcf68f25',
    createdAt: date,
    updatedAt: date,
    labelName: 'my first card',
    cards: [],
  },
  labelId: '5d332513-6d80-4457-b799-bd1cbcf68f25',
};

export const cardData: ICard = {
  cardId: '9dbaccb9-cab7-4846-9122-d005fd53755c',
  createdAt: date,
  updatedAt: date,
  cardName: 'my first card',
  content: 'this is my first card',
  deckId: '07d840a2-0dec-4fdb-862d-ccb3536fbde8',
  labels: [labelsOnCardsData],
};

export const labelData: ILabel = {
  labelId: '5d332513-6d80-4457-b799-bd1cbcf68f25',
  createdAt: date,
  updatedAt: date,
  labelName: 'my first card',
  cards: [labelsOnCardsData],
};

export const deckData: IDeck = {
  deckId: '07d840a2-0dec-4fdb-862d-ccb3536fbde8',
  createdAt: date,
  updatedAt: date,
  deckName: 'my first deck',
  archived: false,
  cards: [cardData],
};
