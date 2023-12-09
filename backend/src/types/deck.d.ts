import { ICard } from './card';

interface IDeck {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  archived: boolean;
  cards: ICard[];
}

interface ICreateDeck {
  name: string;
  archived: boolean;
}

interface IPatchDeck {
  id: string;
  name: string;
  archived: boolean;
}

export { IDeck, ICreateDeck, IPatchDeck };
