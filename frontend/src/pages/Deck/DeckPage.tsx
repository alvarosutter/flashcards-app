import { useEffect, useState } from 'react';
import DashboardBar from '../../components/ui/DashboardBar';
import { Option } from '../../components/ui/Select';
import useArray from '../../hooks/useArray';
import useLoader from '../../hooks/useLoader';
import useLocalStorage from '../../hooks/useLocalStorage';
import { getDecks } from '../../services/Flashcards/deck.services';
import { Deck, sortOptions } from '../../services/Flashcards/flashcardsUtils';
import DeckGallery from './Components/DeckGallery';

function DeckPage() {
  const [sortValue, setSortValue] = useLocalStorage('deck-sort', {
    label: sortOptions[0].label,
    value: sortOptions[0].value,
  });
  const [showArchived, setShowArchived] = useLocalStorage('show-archived', true);
  const { array: decks, set, sort } = useArray([]);
  const [addDeckVisible, setAddDeckVisible] = useState(false);
  const [editDeck, setEditDeck] = useState<Deck | null>(null);
  const [deleteDeck, setDeleteDeck] = useState<Deck | null>(null);
  const [selectedDeck, setSelectedDeck] = useState<Deck | null>(null);
  const { isLoading, setLoading, getLoader } = useLoader();

  function sortDecks(sortOption: Option) {
    const option = sortOptions.filter((o) => o.value === sortOption?.value);
    sort(option[0].func);
  }

  async function fetchDecks() {
    const data = await getDecks();
    set(data);
    sortDecks(sortValue);
  }

  useEffect(() => {
    fetchDecks().then(() => {
      setLoading(false);
    });
  }, []);

  return (
    <>
      {isLoading && getLoader()}
      {!isLoading && !selectedDeck && (
        <>
          <DashboardBar
            title="Decks"
            sortItems={{
              options: sortOptions.map((option) => ({
                label: option.label,
                value: option.value,
              })),
              defaultOption: sortValue,
              onChange: (option) => {
                setSortValue(option);
                sortDecks(option as Option);
              },
            }}
            filterItems={{
              name: 'Archived',
              value: showArchived,
              onClick: (value) => {
                setShowArchived(value);
              },
            }}
            addItem={() => setAddDeckVisible(true)}
          />
          <DeckGallery
            decks={showArchived ? (decks as Deck[]) : (decks as Deck[]).filter((deck) => deck.archived === false)}
            setEditDeck={setEditDeck}
            setDeleteDeck={setDeleteDeck}
            setSelectedDeck={setSelectedDeck}
          />
          <p>{addDeckVisible}</p>
          <p>{editDeck?.deckName}</p>
          <p>{deleteDeck?.deckName}</p>
        </>
      )}
    </>
  );
}

export default DeckPage;
