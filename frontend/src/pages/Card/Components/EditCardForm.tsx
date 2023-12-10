import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import useLoader from '../../../hooks/useLoader';
import { getLabels } from '../../../services/Flashcards/label.services';
import { getDecks } from '../../../services/Flashcards/deck.services';
import { deleteCard, patchCard } from '../../../services/Flashcards/card.services';
import { DangerButton, Form, ActionButton, FormError, TextAreaInput, TextInput } from '../../../components/form';
import { Card, SelectOption } from '../../../types';
import LabelsSelect from './LabelsSelect';
import DeckSelect from './DeckSelect';

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
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
  const [labels, setLabels] = useState<SelectOption[]>([]);
  const [decks, setDecks] = useState<SelectOption[]>([]);
  const { isLoading, setLoading, getLoader } = useLoader();
  const nameInputRef = useRef<HTMLInputElement>(null);
  const contentInputRef = useRef<HTMLTextAreaElement>(null);
  const selectedLabels: string[] = [];

  async function fetchData() {
    const labelsData = await getLabels();
    setLabels(labelsData.map((label) => ({ label: label.name, value: label.id })));
    const decksData = await getDecks();
    setDecks(decksData.map((deck) => ({ label: deck.name, value: deck.id })));
  }

  async function editCardHandler(editedCard: { name: string; content: string }) {
    await patchCard(card.id, editedCard);
  }

  const deleteCardHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await deleteCard(card.id)
      .then(() => onSubmitForm())
      .catch(() => setFormError('Name is invalid or already exists'));
  };

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const name = nameInputRef.current?.value;
    const content = contentInputRef.current?.value;

    const editedCard = {
      deckId: cardDeck,
      name: name!,
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
          <TextInput
            label="Title"
            name="card-name"
            type="text"
            ref={nameInputRef}
            maxLength={25}
            defaultValue={card.name}
            required
          />
        </div>
        <div>
          <DeckSelect
            defaultValue={decks.find((deck) => deck.value === card.deckId)!}
            options={decks}
            onChange={(option: readonly SelectOption[] | SelectOption | null) =>
              setCardDeck((option as SelectOption).value)
            }
          />
        </div>
      </div>
      <TextAreaInput
        label="Text"
        name="card-content"
        defaultValue={card.content}
        ref={contentInputRef}
        rows={4}
        cols={60}
        required
      />
      <LabelsSelect
        options={labels}
        onChange={(option: readonly SelectOption[] | SelectOption | null) => {
          if (Array.isArray(option)) {
            // eslint-disable-next-line array-callback-return
            (option as SelectOption[]).map((label: SelectOption) => {
              selectedLabels.push(label.label);
            });
          } else {
            selectedLabels.push((option as SelectOption).label);
          }
        }}
        defaultValue={labels.filter((label) => card.labels.some((l) => label.value === l.id))}
      />
      {formError && <FormError>{formError}</FormError>}
      <ButtonContainer>
        <DangerButton onClick={deleteCardHandler}>Delete Card</DangerButton>
        <ActionButton type="submit">Edit Card</ActionButton>
      </ButtonContainer>
    </Form>
  );
}

export default EditCardForm;
