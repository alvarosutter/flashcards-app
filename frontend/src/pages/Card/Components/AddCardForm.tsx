import { useEffect, useRef, useState } from 'react';
import { useTheme } from 'styled-components';
import Form from '../../../components/form/Form';
import { FormButton } from '../../../components/form/FormButton';
import FormError from '../../../components/form/FormError';
import { FormInput, TextAreaInput } from '../../../components/form/FormInput';
import Select, { Option } from '../../../components/ui/Select';
import useLoader from '../../../hooks/useLoader';
import { createCard } from '../../../services/Flashcards/card.services';
import { getDecks } from '../../../services/Flashcards/deck.services';
import { getLabels } from '../../../services/Flashcards/label.services';

interface AddCardFormProps {
  deckName: string;
  deckId: string;
  onSubmitForm: () => void;
}

function AddCardForm({ deckName, deckId, onSubmitForm }: AddCardFormProps) {
  const [formError, setFormError] = useState<undefined | string>();
  const [cardDeck, setCardDeck] = useState(deckId);
  const [labels, setLabels] = useState<Option[]>([]);
  const [decks, setDecks] = useState<Option[]>([]);
  const { isLoading, setLoading, getLoader } = useLoader();
  const nameInputRef = useRef<HTMLInputElement>(null);
  const contentInputRef = useRef<HTMLTextAreaElement>(null);
  const selectedLabels: string[] = [];

  const theme = useTheme();
  const customStyles = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    control: (provided: any) => ({
      ...provided,
      color: theme.colors.altText,
      background: theme.colors.inputBg,
      border: 'none',
      boxShadow: 'none',
      fontSize: 'inherit',
      fontFamily: theme.fonts.btnFont,
    }),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    multiValue: (provided: any) => ({
      ...provided,
      color: theme.colors.primaryText,
      backgroundColor: '#6b6b6b',
      borderRadius: '5px',
      fontSize: 'inherit',
      fontFamily: theme.fonts.btnFont,
    }),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    menu: (provided: any) => ({
      ...provided,
      background: theme.colors.inputBg,
      boxShadow: `0 0 0 1px ${theme.colors.primary}`,
      fontSize: 'inherit',
      fontFamily: theme.fonts.btnFont,
    }),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    option: (provided: any) => ({
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

  async function addCardHandler(card: { cardName: string; content: string }) {
    await createCard(card);
  }

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const name = nameInputRef.current?.value;
    const content = contentInputRef.current?.value;

    const card = {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      cardName: name!,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      content: content!,
      deckId: cardDeck,
      labels: selectedLabels,
    };

    await addCardHandler(card)
      .then(() => onSubmitForm())
      .catch(() => setFormError('Some Input is invalid, missing or name already exists'));
  };

  useEffect(() => {
    fetchData().then(() => {
      setLoading(false);
    });
  }, []);

  if (isLoading) {
    return getLoader();
  }
  return (
    <Form onSubmit={submitHandler} onBlur={() => setFormError(undefined)}>
      <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', margin: '0', padding: '0' }}>
        <div>
          <FormInput label="Title" name="card-name" type="text" ref={nameInputRef} maxLength={25} required autoFocus />
        </div>
        <div>
          {deckName !== 'All' ? (
            <FormInput label="Deck" name="deck-name" type="text" value={deckName} readOnly />
          ) : (
            <Select
              selectLabel="Deck"
              style={customStyles}
              options={decks}
              name="select-card-deck"
              isMulti={false}
              isSearchable={false}
              isClearable={false}
              isDisabled={false}
              // eslint-disable-next-line no-return-assign
              onChange={(option: readonly Option[] | Option | null) => setCardDeck((option as Option).value)}
            />
          )}
        </div>
      </div>
      <TextAreaInput label="Text" name="card-content" ref={contentInputRef} rows={4} cols={60} required />
      <Select
        selectLabel="Labels"
        style={customStyles}
        options={labels}
        name="select-card-labels"
        isMulti
        isSearchable
        isClearable
        isDisabled={false}
        onChange={(option: readonly Option[] | Option | null) => {
          // eslint-disable-next-line array-callback-return
          (option as Option[]).map((label: Option) => {
            selectedLabels.push(label.label);
          });
        }}
      />
      {formError && <FormError>{formError}</FormError>}
      <FormButton style={{ margin: '25px 0 15px' }} type="submit">
        Add Card
      </FormButton>
    </Form>
  );
}

export default AddCardForm;
