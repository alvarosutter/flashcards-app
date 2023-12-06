import { useEffect, useRef, useState } from 'react';
import { useTheme } from 'styled-components';
import { StylesConfig } from 'react-select';
import { Form, FormButton, FormError, FormTextAreaInput, FormTextInput } from '../../../components/form';
import Select, { Option } from '../../../components/dashboard/Select';
import useLoader from '../../../hooks/useLoader';
import { createCard } from '../../../services/Flashcards/card.services';
import { getLabels } from '../../../services/Flashcards/label.services';

interface AddCardFormProps {
  deckName: string;
  deckId: string;
  onSubmitForm: () => void;
}

function AddCardForm({ deckName, deckId, onSubmitForm }: AddCardFormProps) {
  const [formError, setFormError] = useState<undefined | string>();
  const [labels, setLabels] = useState<Option[]>([]);
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
  }

  async function addCardHandler(card: { cardName: string; content: string }) {
    await createCard(card);
  }

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const name = nameInputRef.current?.value;
    const content = contentInputRef.current?.value;

    const card = {
      cardName: name!,
      content: content!,
      deckId,
      labels: selectedLabels,
    };

    await addCardHandler(card)
      .then(() => onSubmitForm())
      .catch(() => setFormError('Some Input is invalid, missing or name already exists'));
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
    <Form onSubmit={() => submitHandler} onBlur={() => setFormError(undefined)}>
      <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', margin: '0', padding: '0' }}>
        <div>
          <FormTextInput
            label="Title"
            name="card-name"
            type="text"
            ref={nameInputRef}
            maxLength={25}
            required
            autoFocus
          />
        </div>
        <div>
          <FormTextInput label="Deck" name="deck-name" type="text" value={deckName} readOnly />
        </div>
      </div>
      <FormTextAreaInput label="Text" name="card-content" ref={contentInputRef} rows={4} cols={60} required />
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
          (option as Option[]).map((label: Option) => selectedLabels.push(label.label));
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
