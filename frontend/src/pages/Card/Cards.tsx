import { useCallback, useEffect, useState } from 'react';
import DashboardBar from '../../components/dashboard/DashboardBar';
import Modal from '../../components/ui/Modal';
import { Option } from '../../components/dashboard/Select';
import { getDeckCards, getDecks } from '../../services/Flashcards/deck.services';
import { Card, Deck, isDeck, isLabel, Label, sortOptions } from '../../services/Flashcards/flashcardsUtils';
import { getLabelCards, getLabels } from '../../services/Flashcards/label.services';
import AddCardForm from './Components/AddCardForm';
import CardGallery from './Components/CardGallery';
import CardSlider from './Components/CardSlider';
import EditCardForm from './Components/EditCardForm';
import { useArray, useLoader, useLocalStorage } from '../../hooks';

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
  }) as [{ label: string; value: string }, (value: Option | null) => void];
  const [filterValue, setFilterValue] = useState<Option>({ label: 'All', value: 'All' });
  const [filterData, setFilterData] = useState<Option[]>([]);
  const [pageType, setPageType] = useState<'deck' | 'label'>('deck');
  const [addCardVisible, setAddCardVisible] = useState(false);
  const [editCard, setEditCard] = useState<Card | null>(null);
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const { isLoading, setLoading, getLoader } = useLoader();

  function sortCards(sortOption: Option) {
    const option = sortOptions.filter((o) => o.value === sortOption?.value);
    sort(option[0].func);
  }

  async function fetchCards() {
    let cardsData: Card[] = [];
    if (isDeck(item)) {
      cardsData = await getDeckCards(item.deckId);
    }
    if (isLabel(item)) {
      cardsData = await getLabelCards(item.labelId);
    }
    setCards(cardsData);
    sortCards(sortValue);
  }

  async function fetchFilterData() {
    if (isDeck(item)) {
      setPageType('deck');
      const res = await getLabels();
      const data = res
        .map((e) => ({ label: e.labelName, value: e.labelId }))
        .sort((a, b) => a.label.localeCompare(b.label));
      data.unshift({ label: 'All', value: 'All' });
      setFilterData(data);
    }
    if (isLabel(item)) {
      setPageType('label');
      const res = await getDecks();
      const data = res
        .map((e) => ({ label: e.deckName, value: e.deckId }))
        .sort((a, b) => a.label.localeCompare(b.label));
      data.unshift({ label: 'All', value: 'All' });
      setFilterData(data);
    }
  }

  function filterCards(arr: Card[]) {
    const labelId = filterValue.value;
    if (labelId !== 'All') {
      return arr.filter((card) => card.labels?.find((label) => label.labelId === labelId));
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
          <DashboardBar
            sortItems={{
              options: sortOptions.map((option) => ({
                label: option.label,
                value: option.value,
              })),
              defaultOption: sortValue,
              onChange: (option) => {
                setSortValue(option as Option);
                sortCards(option as Option);
              },
            }}
            filterCards={{
              options: filterData,
              defaultOption: filterValue,
              onChange: (value) => {
                setFilterValue(value as Option);
              },
            }}
            addItem={pageType === 'deck' ? () => setAddCardVisible(true) : undefined}
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
              <AddCardForm onSubmitForm={handleOnSubmitAddCard} deckName={item.deckName} deckId={item.deckId} />
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
