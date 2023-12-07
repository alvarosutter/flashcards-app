import { useEffect, useRef, useState } from 'react';
import styled, { useTheme } from 'styled-components';
import { StylesConfig } from 'react-select';
import { Card } from '../../../services/Flashcards/flashcardsUtils';
import Select, { Option } from '../../../components/dashboard/Select';
import useLoader from '../../../hooks/useLoader';
import { getLabels } from '../../../services/Flashcards/label.services';
import { getDecks } from '../../../services/Flashcards/deck.services';
import { deleteCard, patchCard } from '../../../services/Flashcards/card.services';
import { DangerButton, Form, FormButton, FormError, FormTextAreaInput, FormTextInput } from '../../../components/form';

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
  width: 100%;
  margin: 25px 0 15px;
  padding: 0;
`;

interface EditCardFormProps {
  card: Card;
  onSubmitForm: () => void;
}

function EditCardForm({ card, onSubmitForm }: EditCardFormProps) {
  const [formError, setFormError] = useState<undefined | string>();
  const [cardDeck, setCardDeck] = useState(card.deckId);
  const [labels, setLabels] = useState<Option[]>([]);
  const [decks, setDecks] = useState<Option[]>([]);
  const { isLoading, setLoading, getLoader } = useLoader();
  const nameInputRef = useRef<HTMLInputElement>(null);
  const contentInputRef = useRef<HTMLTextAreaElement>(null);
  const selectedLabels: string[] = [];

  const theme = useTheme();
  const customStyles: StylesConfig<Option> = {
    control: (provided) => ({
      ...provided,
      color: theme.colors.altText,
      background: theme.colors.inputBg,
      border: 'none',
      boxShadow: 'none',
      fontSize: 'inherit',
      fontFamily: theme.fonts.btnFont,
    }),

    multiValue: (provided) => ({
      ...provided,
      color: theme.colors.primaryText,
      backgroundColor: '#6b6b6b',
      borderRadius: '5px',
      fontSize: 'inherit',
      fontFamily: theme.fonts.btnFont,
    }),

    menu: (provided) => ({
      ...provided,
      background: theme.colors.inputBg,
      boxShadow: `0 0 0 1px ${theme.colors.primary}`,
      fontSize: 'inherit',
      fontFamily: theme.fonts.btnFont,
    }),

    option: (provided) => ({
      ...provided,
      background: theme.colors.inputBg,
      '&:hover': {
        background: '#6b6b6b',
      },
      fontSize: 'inherit',
      fontFamily: theme.fonts.btnFont,
    }),
  };

  async function fetchData() {
    const labelsData = await getLabels();
    setLabels(labelsData.map((label) => ({ label: label.labelName, value: label.labelId })));
    const decksData = await getDecks();
    setDecks(decksData.map((deck) => ({ label: deck.deckName, value: deck.deckId })));
  }

  async function editCardHandler(editedCard: { cardName: string; content: string }) {
    await patchCard(card.cardId, editedCard);
  }

  const deleteCardHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await deleteCard(card.cardId)
      .then(() => onSubmitForm())
      .catch(() => setFormError('Name is invalid or already exists'));
  };

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const name = nameInputRef.current?.value;
    const content = contentInputRef.current?.value;

    const editedCard = {
      deckId: cardDeck,
      cardName: name!,
      content: content!,
      labels: selectedLabels,
    };

    await editCardHandler(editedCard)
      .then(() => onSubmitForm())
      .catch(() => setFormError('Name is invalid or already exists'));
  };

  useEffect(() => {
    fetchData()
      .then(() => {
        setLoading(false);
      })
      .catch(() => {
        throw Error('Error when fetching data');
      });
  }, []);

  if (isLoading) {
    return getLoader();
  }
  return (
    <Form onSubmit={submitHandler} onBlur={() => setFormError(undefined)}>
      <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', margin: '0', padding: '0' }}>
        <div>
          <FormTextInput
            label="Title"
            name="card-name"
            type="text"
            ref={nameInputRef}
            maxLength={25}
            defaultValue={card.cardName}
            required
          />
        </div>
        <div>
          <Select
            selectLabel="Deck"
            defaultValue={decks.find((deck) => deck.value === card.deckId)}
            style={customStyles}
            options={decks}
            name="select-card-deck"
            isMulti={false}
            isSearchable={false}
            isClearable={false}
            isDisabled={false}
            onChange={(option: readonly Option[] | Option | null) => setCardDeck((option as Option).value)}
          />
        </div>
      </div>
      <FormTextAreaInput
        label="Text"
        name="card-content"
        defaultValue={card.content}
        ref={contentInputRef}
        rows={4}
        cols={60}
        required
      />
      <Select
        selectLabel="Labels"
        defaultValue={labels.filter((label) => card.labels.some((l) => label.value === l.labelId))}
        style={customStyles}
        options={labels}
        name="select-card-labels"
        isMulti
        isSearchable
        isClearable
        isDisabled={false}
        onChange={(option: readonly Option[] | Option | null) => {
          (option as Option[]).map((label: Option) => selectedLabels.push(label.label));
        }}
      />
      {formError && <FormError>{formError}</FormError>}
      <ButtonContainer>
        <DangerButton onClick={deleteCardHandler}>Delete Card</DangerButton>
        <FormButton type="submit">Edit Card</FormButton>
      </ButtonContainer>
    </Form>
  );
}

export default EditCardForm;
