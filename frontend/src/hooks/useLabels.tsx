import { useQuery } from '@tanstack/react-query';

import { getLabels } from '../services/FlashcardsApi/label.services';

function useLabels() {
  const labelsQuery = useQuery({
    queryKey: ['labels'],
    queryFn: async () => {
      const labels = await getLabels();
      return labels;
    },
  });

  return { labels: labelsQuery.data ?? [], ...labelsQuery };
}

export default useLabels;
