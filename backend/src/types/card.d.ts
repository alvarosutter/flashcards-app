import ILabelsOnCards from './labelOnCards';

interface ICard {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  content: string;
  deckId: string;
  labels: ILabelsOnCards[];
}

interface ICreateCard {
  name: string;
  content: string;
  deckId: string;
  labels?: string[];
}

interface IPatchCard {
  id: string;
  name: string;
  content: string;
  labels?: string[];
}

export { ICard, ICreateCard, IPatchCard };
