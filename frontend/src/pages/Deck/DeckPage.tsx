import { useCallback, useEffect, useState } from 'react';
import Modal from '../../components/ui/Modal';
import { useArray, useLoader, useLocalStorage } from '../../hooks';
import { getDecks } from '../../services/Flashcards/deck.services';
import AddDeckForm from './Components/AddDeckForm';
import DeckGallery from './Components/DeckGallery';
import DeleteDeckForm from './Components/DeleteDeckForm';
import EditDeckForm from './Components/EditDeckForm';
import Cards from '../Card/Cards';
import { Deck, SelectOption } from '../../types';
import DeckDashboardBar from './Components/DeckDashboardBar';
import sortOptions from '../utils/sortOptions';

interface IDecksArray {
  array: Deck[];
  set: React.Dispatch<React.SetStateAction<Deck[]>>;
  sort: (callback: (a: Deck, b: Deck) => number) => void;
}

function DeckPage() {
  const [sortValue, setSortValue] = useLocalStorage('deck-sort', {
    label: sortOptions[0].label,
    value: sortOptions[0].value,
  }) as [SelectOption, React.Dispatch<React.SetStateAction<SelectOption>>];
  const [showArchived, setShowArchived] = useLocalStorage('show-archived', true) as [
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>,
  ];
  const { array: decks, set, sort } = useArray([]) as IDecksArray;
  const [addDeckVisible, setAddDeckVisible] = useState(false);
  const [editDeck, setEditDeck] = useState<Deck | null>(null);
  const [deleteDeck, setDeleteDeck] = useState<Deck | null>(null);
  const [selectedDeck, setSelectedDeck] = useState<Deck | null>(null);
  const { isLoading, setLoading, getLoader } = useLoader();

  function sortDecks(sortOption: SelectOption) {
    const option = sortOptions.filter((o) => o.value === sortOption?.value);
    sort(option[0].func);
  }

  async function fetchDecks() {
    const data = await getDecks();
    set(data);
    sortDecks(sortValue);
  }

  const handleOnSubmitAddDeck = useCallback(async () => {
    setAddDeckVisible(false);
    await fetchDecks();
  }, [setAddDeckVisible]);

  const handleOnSubmitEditDeck = useCallback(async () => {
    setEditDeck(null);
    await fetchDecks();
  }, [setEditDeck]);

  const handleOnSubmitDeleteDeck = useCallback(async () => {
    setDeleteDeck(null);
    await fetchDecks();
  }, [setDeleteDeck]);

  useEffect(() => {
    fetchDecks()
      .then(() => {
        setLoading(false);
      })
      .catch(() => {
        throw Error('Error when fetching data');
      });
  }, []);

  return (
    <>
      {selectedDeck && (
        <Cards
          item={selectedDeck}
          goBack={() => {
            setSelectedDeck(null);
            setLoading(true);
            fetchDecks()
              .then(() => {
                setLoading(false);
              })
              .catch(() => {
                throw Error('Error when fetching data');
              });
          }}
        />
      )}
      {isLoading && getLoader()}
      {!isLoading && !selectedDeck && (
        <>
          <DeckDashboardBar
            addItem={() => setAddDeckVisible(true)}
            options={sortOptions.map((option) => ({
              label: option.label,
              value: option.value,
            }))}
            defaultValue={sortValue}
            onChange={(option) => {
              setSortValue(option as SelectOption);
              sortDecks(option as SelectOption);
            }}
            value={showArchived}
            onClick={(value) => setShowArchived(value)}
          />
          <DeckGallery
            decks={showArchived ? decks : decks.filter((deck) => deck.archived === false)}
            setEditDeck={setEditDeck}
            setDeleteDeck={setDeleteDeck}
            setSelectedDeck={setSelectedDeck}
          />
          <Modal
            title="Add Deck"
            isOpen={addDeckVisible}
            onCancel={() => {
              setAddDeckVisible(false);
            }}
          >
            <AddDeckForm onSubmitForm={handleOnSubmitAddDeck} />
          </Modal>
          <Modal
            title="Edit Deck"
            isOpen={!!editDeck}
            onCancel={() => {
              setEditDeck(null);
            }}
          >
            <EditDeckForm
              onSubmitForm={handleOnSubmitEditDeck}
              deck={editDeck!}
              onCancel={() => {
                setEditDeck(null);
              }}
            />
          </Modal>
          <Modal
            title="Delete Deck"
            isOpen={!!deleteDeck}
            onCancel={() => {
              setDeleteDeck(null);
            }}
          >
            <DeleteDeckForm
              onSubmitForm={handleOnSubmitDeleteDeck}
              deck={deleteDeck!}
              onCancel={() => {
                setDeleteDeck(null);
              }}
            />
          </Modal>
        </>
      )}
    </>
  );
}

export default DeckPage;
