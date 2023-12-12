import { useEffect, useState } from 'react';
import Modal from '../../components/ui/Modal';
import AddCardForm from './Components/AddCardForm';
import CardGallery from './Components/CardGallery';
import CardSlider from './Components/CardSlider';
import EditCardForm from './Components/EditCardForm';
import { useCards, useDecks, useLabels, useLocalStorage } from '../../hooks';
import { Card, Deck, Label, SelectOption, SortOption } from '../../types';
import CardDashboardBar from './Components/CardDashboardBar';
import { sortOptions, sortDefaultOption } from '../../utils/sortOptions';
import { isDeck } from '../../utils/typeGuards';
import { Loader, QueryError } from '../../components/ui';
import DeleteCardForm from './Components/DeleteCardForm';

interface CardsProps {
  item: Deck | Label;
  goBack: () => void;
}

function Cards({ item, goBack }: CardsProps) {
  const { value: sortValue, setValue: setSortValue } = useLocalStorage('deck-sort', sortDefaultOption) as SortOption;
  const type = isDeck(item) ? 'deck' : 'label';
  const { cards, status: cardsStatus, error: cardsQueryError } = useCards({ id: item.id, type, name: item.name });
  const { labels, status: labelsStatus, error: labelsQueryError } = useLabels();
  const { decks, status: decksStatus, error: decksQueryError } = useDecks();
  const [addCardVisible, setAddCardVisible] = useState(false);
  const [editCard, setEditCard] = useState<Card | null>(null);
  const [deleteCard, setDeleteCard] = useState<Card | null>(null);
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);

  function sortCards(sortOption: SelectOption) {
    const option = sortOptions.filter((o) => o.value === sortOption?.value);
    cards.sort(option[0].func);
  }

  useEffect(() => sortCards(sortValue), [cards]);

  if (cardsStatus === 'pending' || labelsStatus === 'pending' || decksStatus === 'pending') return <Loader />;
  if (cardsStatus === 'error' || labelsStatus === 'error' || decksStatus === 'error') {
    return (
      <QueryError
        message={(cardsQueryError?.message && labelsQueryError?.message && decksQueryError?.message) ?? 'Unknown Error'}
      />
    );
  }

  return (
    <>
      <CardDashboardBar
        title={`${item.name}'s Cards`}
        addItem={type === 'deck' ? () => setAddCardVisible(true) : undefined}
        sortOptions={sortOptions.map((option) => ({
          label: option.label,
          value: option.value,
        }))}
        sortDefaultValue={sortValue}
        onChangeSort={(option) => {
          setSortValue(option as SelectOption);
          sortCards(option as SelectOption);
        }}
        goBack={goBack}
      />
      <CardGallery cards={cards ?? []} setSelectedCard={setSelectedCard} />
      {isDeck(item) && (
        <Modal
          title="Add Card"
          isOpen={addCardVisible}
          onCancel={() => {
            setAddCardVisible(false);
          }}
        >
          <AddCardForm
            onSubmitForm={() => {
              setAddCardVisible(false);
            }}
            deckName={item.name}
            deckId={item.id}
            labels={labels}
          />
        </Modal>
      )}
      <Modal
        title="Edit Card"
        isOpen={!!editCard}
        onCancel={() => {
          setEditCard(null);
        }}
      >
        <EditCardForm
          onSubmitForm={() => {
            setEditCard(null);
          }}
          card={editCard!}
          labels={labels}
          decks={decks}
          onCancel={() => {
            setEditCard(null);
          }}
        />
      </Modal>
      <Modal
        title="Delete Card"
        isOpen={!!deleteCard}
        onCancel={() => {
          setDeleteCard(null);
        }}
      >
        <DeleteCardForm
          onSubmitForm={() => {
            setDeleteCard(null);
          }}
          card={deleteCard!}
          decks={decks}
          onCancel={() => {
            setDeleteCard(null);
          }}
        />
      </Modal>
      {selectedCard && (
        <CardSlider
          cards={cards ?? []}
          position={cards.indexOf(selectedCard)}
          isOpen={!!selectedCard}
          onCancel={() => {
            setSelectedCard(null);
            setDeleteCard(null);
            setEditCard(null);
          }}
          onEdit={(card) => setEditCard(card)}
          onDelete={(card) => setDeleteCard(card)}
        />
      )}
    </>
  );
}

export default Cards;
