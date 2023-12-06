import { ICard } from '../types/card';
import ILabelsOnCards from '../types/labelOnCards';

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
