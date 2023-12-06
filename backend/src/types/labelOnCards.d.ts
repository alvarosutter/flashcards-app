interface ICard {
  cardId: string;
  createdAt: Date;
  updatedAt: Date;
  cardName: string;
  content: string;
  deckId: string;
  labels: ILabelsOnCards[];
}

interface ILabel {
  labelId: string;
  createdAt: Date;
  updatedAt: Date;
  labelName: string;
  cards: ILabelsOnCards[];
}

interface ILabelsOnCards {
  card: ICard;
  cardId: string;
  label: ILabel;
  labelId: string;
}

export default ILabelsOnCards;
