import ILabelsOnCards from './labelOnCards';

interface ICard {
  cardId: string;
  createdAt: Date;
  updatedAt: Date;
  cardName: string;
  content: string;
  deckId: string;
  labels: ILabelsOnCards[];
}

interface ICreateCard {
  cardName: string;
  content: string;
  deckId: string;
  labels?: string[];
}

interface IPatchCard {
  cardId: string;
  cardName: string;
  content: string;
  labels?: string[];
}

export { ICard, ICreateCard, IPatchCard };
