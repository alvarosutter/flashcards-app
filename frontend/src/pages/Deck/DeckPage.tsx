import { useEffect, useState } from 'react';
import { useLocalStorage, useDecks } from '../../hooks';
import { SortOption, FilterValue, Deck, SelectOption } from '../../types';
import { sortDefaultOption, sortOptions } from '../../utils/sortOptions';
import { Loader, Modal, QueryError } from '../../components/ui';
import DeckDashboardBar from './Components/DeckDashboardBar';
import DeckGallery from './Components/DeckGallery';
import AddDeckForm from './Components/AddDeckForm';
import EditDeckForm from './Components/EditDeckForm';
import DeleteDeckForm from './Components/DeleteDeckForm';
import Cards from '../Card/Cards';

function DeckPage() {
  const { value: sortValue, setValue: setSortValue } = useLocalStorage('deck-sort', sortDefaultOption) as SortOption;
  const { value: showArchived, setValue: setShowArchived } = useLocalStorage('show-archived', true) as FilterValue;
  const { decks, status, error: queryError } = useDecks();
  const [addDeckVisible, setAddDeckVisible] = useState(false);
  const [editDeck, setEditDeck] = useState<Deck | null>(null);
  const [deleteDeck, setDeleteDeck] = useState<Deck | null>(null);
  const [selectedDeck, setSelectedDeck] = useState<Deck | null>(null);

  function sortDecks(sortOption: SelectOption) {
    const option = sortOptions.filter((o) => o.value === sortOption?.value);
    decks.sort(option[0].func);
  }

  useEffect(() => sortDecks(sortValue), [decks]);

  if (status === 'pending') return <Loader />;
  if (status === 'error') return <QueryError message={queryError.message} />;

  if (selectedDeck) {
    return (
      <Cards
        item={selectedDeck}
        goBack={() => {
          setSelectedDeck(null);
        }}
      />
    );
  }

  return (
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
        <AddDeckForm
          onSubmitForm={() => {
            setAddDeckVisible(false);
          }}
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
          onSubmitForm={() => {
            setEditDeck(null);
          }}
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
          onSubmitForm={() => {
            setDeleteDeck(null);
          }}
          deck={deleteDeck!}
          onCancel={() => {
            setDeleteDeck(null);
          }}
        />
      </Modal>
    </>
  );
}

export default DeckPage;
