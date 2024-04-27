import { useQuery } from '@tanstack/react-query';

import { getDeckCards } from '../services/FlashcardsApi/deck.services';
import { getLabelCards } from '../services/FlashcardsApi/label.services';

interface IUseDeckCardsProps {
  id: string;
  type: string;
  name: string;
}

function useDeckCards({ id, type, name }: IUseDeckCardsProps) {
  const cardsQuery = useQuery({
    queryKey: [`${type}-cards`, name],
    queryFn: async () => {
      const cards = type === 'deck' ? await getDeckCards(id) : await getLabelCards(id);
      return cards;
    },
  });

  return { cards: cardsQuery.data ?? [], ...cardsQuery };
}

export default useDeckCards;
