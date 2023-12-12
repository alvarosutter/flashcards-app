import { useQuery } from '@tanstack/react-query';
import { getDecks } from '../services/FlashcardsApi/deck.services';

function useDecks() {
  const decksQuery = useQuery({
    queryKey: ['decks'],
    queryFn: async () => {
      const decks = await getDecks();
      return decks;
    },
  });

  return { decks: decksQuery.data ?? [], ...decksQuery };
}

export default useDecks;
