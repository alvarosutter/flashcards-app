import { useEffect, useState } from 'react';
import DashboardBar from '../../components/dashboard/DashboardBar';
import Modal from '../../components/ui/Modal';
import { Option } from '../../components/dashboard/Select';
import { useArray, useLoader, useLocalStorage } from '../../hooks';
import { getDecks } from '../../services/Flashcards/deck.services';
import { Deck, sortOptions } from '../../services/Flashcards/flashcardsUtils';
import Cards from '../Card/Cards';
import AddDeckForm from './Components/AddDeckForm';
import DeckGallery from './Components/DeckGallery';
import DeleteDeckForm from './Components/DeleteDeckForm';
import EditDeckForm from './Components/EditDeckForm';

interface IDecksArray {
  array: Deck[];
  set: React.Dispatch<React.SetStateAction<Deck[]>>;
  sort: (callback: (a: Deck, b: Deck) => number) => void;
}

function DeckPage() {
  const [sortValue, setSortValue] = useLocalStorage('deck-sort', {
    label: sortOptions[0].label,
    value: sortOptions[0].value,
  }) as [Option, React.Dispatch<React.SetStateAction<Option>>];
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

  function sortDecks(sortOption: Option) {
    const option = sortOptions.filter((o) => o.value === sortOption?.value);
    sort(option[0].func);
  }

  async function fetchDecks() {
    const data = await getDecks();
    set(data);
    sortDecks(sortValue);
  }

  async function handleOnSubmitAddDeck() {
    setAddDeckVisible(false);
    await fetchDecks();
  }
  async function handleOnSubmitEditDeck() {
    setEditDeck(null);
    await fetchDecks();
  }
  async function handleOnSubmitDeleteDeck() {
    setEditDeck(null);
    await fetchDecks();
  }

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
          <DashboardBar
            title="Decks"
            sortItems={{
              options: sortOptions.map((option) => ({
                label: option.label,
                value: option.value,
              })),
              defaultOption: sortValue,
              onChange: (option) => {
                setSortValue(option as Option);
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
            <AddDeckForm
              // eslint-disable-next-line react/jsx-no-bind, @typescript-eslint/no-misused-promises
              onSubmit={handleOnSubmitAddDeck}
            />
          </Modal>
          <Modal
            title="Edit Deck"
            isOpen={!!editDeck}
            onCancel={() => {
              setEditDeck(null);
            }}
          >
            <EditDeckForm
              onSubmitForm={() => handleOnSubmitEditDeck}
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
              onSubmitForm={() => handleOnSubmitDeleteDeck}
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
