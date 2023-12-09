interface ICard {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  content: string;
  deckId: string;
  labels: ILabelsOnCards[];
}

interface ILabel {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  cards: ILabelsOnCards[];
}

interface ILabelsOnCards {
  card: ICard;
  cardId: string;
  label: ILabel;
  labelId: string;
}

export default ILabelsOnCards;
