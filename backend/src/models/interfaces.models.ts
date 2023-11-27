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
  cardName: string;
  content: string;
  deckId: string;
  labels: ILabelsOnCards[];
}

interface ILabel extends Base {
  labelId: string;
  labelName: string;
  cards: ILabelsOnCards[];
}

interface ILabelsOnCards {
  card: ICard;
  cardId: string;
  label: ILabel;
  labelId: string;
}

export type { IDeck, ICard, ILabel, ILabelsOnCards };
