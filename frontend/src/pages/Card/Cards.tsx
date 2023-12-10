import { useCallback, useEffect, useState } from 'react';
import Modal from '../../components/ui/Modal';
import { getDeckCards, getDecks } from '../../services/Flashcards/deck.services';
import { getLabelCards, getLabels } from '../../services/Flashcards/label.services';
import AddCardForm from './Components/AddCardForm';
import CardGallery from './Components/CardGallery';
import CardSlider from './Components/CardSlider';
import EditCardForm from './Components/EditCardForm';
import { useArray, useLoader, useLocalStorage } from '../../hooks';
import { Card, Deck, Label, SelectOption } from '../../types';
import CardDashboardBar from './Components/CardDashboardBar';
import sortOptions from '../utils/sortOptions';
import { isDeck, isLabel } from '../utils/typeGuards';

interface CardsProps {
  item: Deck | Label;
  goBack: () => void;
}

interface ICardsArray {
  array: Card[];
  set: React.Dispatch<React.SetStateAction<Card[]>>;
  sort: (callback: (a: Card, b: Card) => number) => void;
}

function Cards({ item, goBack }: CardsProps) {
  const { array: cards, set: setCards, sort } = useArray(item.cards) as ICardsArray;
  const [sortValue, setSortValue] = useLocalStorage('card-sort', {
    label: sortOptions[0].label,
    value: sortOptions[0].value,
  }) as [{ label: string; value: string }, (value: SelectOption | null) => void];
  const [filterValue, setFilterValue] = useState<SelectOption>({ label: 'All', value: 'All' });
  const [filterData, setFilterData] = useState<SelectOption[]>([]);
  const [pageType, setPageType] = useState<'deck' | 'label'>('deck');
  const [addCardVisible, setAddCardVisible] = useState(false);
  const [editCard, setEditCard] = useState<Card | null>(null);
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const { isLoading, setLoading, getLoader } = useLoader();

  function sortCards(sortOption: SelectOption) {
    const option = sortOptions.filter((o) => o.value === sortOption?.value);
    sort(option[0].func);
  }

  async function fetchCards() {
    let cardsData: Card[] = [];

    if (isDeck(item)) {
      cardsData = await getDeckCards(item.id);
    }
    if (isLabel(item)) {
      cardsData = await getLabelCards((item as Label).id);
    }
    setCards(cardsData);
    sortCards(sortValue);
  }

  async function fetchFilterData() {
    if (isDeck(item)) {
      setPageType('deck');
      const res = await getLabels();
      const data = res.map((e) => ({ label: e.name, value: e.id })).sort((a, b) => a.label.localeCompare(b.label));
      data.unshift({ label: 'All', value: 'All' });
      setFilterData(data);
    }
    if (isLabel(item)) {
      setPageType('label');
      const res = await getDecks();
      const data = res.map((e) => ({ label: e.name, value: e.id })).sort((a, b) => a.label.localeCompare(b.label));
      data.unshift({ label: 'All', value: 'All' });
      setFilterData(data);
    }
  }

  function filterCards(arr: Card[]) {
    const labelId = filterValue.value;
    if (labelId !== 'All') {
      return arr.filter((card) => card.labels?.find((label) => label.id === labelId));
    }
    return arr;
  }

  const handleOnSubmitAddCard = useCallback(async () => {
    setAddCardVisible(false);
    await fetchCards();
  }, [setAddCardVisible]);

  const handleOnSubmitEditCard = useCallback(async () => {
    setEditCard(null);
    await fetchCards();
  }, [setEditCard]);

  useEffect(() => {
    fetchFilterData()
      .then(() => {
        setLoading(false);
      })
      .catch(() => {
        throw Error('Error when fetching data');
      });
  }, []);

  return (
    <>
      {isLoading && getLoader()}
      {!isLoading && (
        <>
          <CardDashboardBar
            addItem={pageType === 'deck' ? () => setAddCardVisible(true) : undefined}
            sortOptions={sortOptions.map((option) => ({
              label: option.label,
              value: option.value,
            }))}
            sortDefaultValue={sortValue}
            onChangeSort={(option) => {
              setSortValue(option as SelectOption);
              sortCards(option as SelectOption);
            }}
            filterOptions={filterData}
            filterDefaultValue={filterValue}
            onChangeFilter={(value) => {
              setFilterValue(value as SelectOption);
            }}
            goBack={goBack}
          />
          <CardGallery cards={filterCards(cards)} setSelectedCard={setSelectedCard} />
          {isDeck(item) && (
            <Modal
              title="Add Card"
              isOpen={addCardVisible}
              onCancel={() => {
                setAddCardVisible(false);
              }}
            >
              <AddCardForm onSubmitForm={handleOnSubmitAddCard} deckName={item.name} deckId={item.id} />
            </Modal>
          )}
          <Modal
            title="Edit Card"
            isOpen={!!editCard}
            onCancel={() => {
              setEditCard(null);
            }}
          >
            <EditCardForm onSubmitForm={handleOnSubmitEditCard} card={editCard!} />
          </Modal>
          {selectedCard && (
            <CardSlider
              cards={filterCards(cards)}
              position={filterCards(cards).indexOf(selectedCard)}
              isOpen={!!selectedCard}
              onCancel={() => {
                setSelectedCard(null);
                setEditCard(null);
              }}
              onEdit={(card) => setEditCard(card)}
            />
          )}
        </>
      )}
    </>
  );
}

export default Cards;
