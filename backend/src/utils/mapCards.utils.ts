import { ICard } from '../models/interfaces.models';

function mapCards(cards: ICard[]) {
  return cards.map((card) => ({ ...card, labels: card.labels.map((element) => element.label) }));
}

export default mapCards;
