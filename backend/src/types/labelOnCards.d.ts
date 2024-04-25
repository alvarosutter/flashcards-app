interface Card {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  content: string;
  deckId: string;
  labels: Array<LabelsOnCards>;
}

interface Label {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  cards: Array<LabelsOnCards>;
}

interface LabelsOnCards {
  card: Card;
  cardId: string;
  label: Label;
  labelId: string;
}

export default LabelsOnCards;
