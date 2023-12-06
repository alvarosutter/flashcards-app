import { ICard } from './card';

interface IDeck {
  deckId: string;
  createdAt: Date;
  updatedAt: Date;
  deckName: string;
  archived: boolean;
  cards: ICard[];
}

interface ICreateDeck {
  deckName: string;
  archived: boolean;
}

interface IPatchDeck {
  deckId: string;
  deckName: string;
  archived: boolean;
}

export { IDeck, ICreateDeck, IPatchDeck };
