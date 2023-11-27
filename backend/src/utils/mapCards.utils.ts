import { ICard, ILabelsOnCards } from '../models/interfaces.models';

function mapDeckCards(cards: ICard[]) {
  return cards.map((card) => ({ ...card, labels: card.labels.map((element) => element.label) }));
}

function mapLabelCards(cards: ILabelsOnCards[]) {
  return cards.map((element) => ({
    ...element.card,
    labels: element.card.labels.map((e) => e.label),
  }));
}

export { mapDeckCards, mapLabelCards };
