interface Base {
  createdAt: Date;
  updatedAt: Date;
}

interface IDeck extends Base {
  deckId: string;
  deckName: string;
  archived: boolean;
  cards: ICard[];
}

interface ICard extends Base {
  cardId: string;
  createdAt: Date;
  updatedAt: Date;
  cardName: string;
  content: string;
  deckId: string;
  labels: ILabel[];
}

interface ILabel extends Base {
  labelId: string;
  createdAt: Date;
  updatedAt: Date;
  labelName: string;
  cards: ICard[];
}

export type { IDeck, ICard, ILabel };
