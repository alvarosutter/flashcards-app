import type { Card } from '../types/card';
import type LabelsOnCards from '../types/labelOnCards';

function mapDeckCards(cards: Array<Card>) {
  return cards.map((card) => ({ ...card, labels: card.labels.map((element) => element.label) }));
}

function mapLabelCards(cards: Array<LabelsOnCards>) {
  return cards.map((element) => ({
    ...element.card,
    labels: element.card.labels.map((e) => e.label),
  }));
}

export { mapDeckCards, mapLabelCards };
