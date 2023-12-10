import { useEffect, useRef, useState } from 'react';
import { Form, ActionButton, FormError, TextAreaInput, TextInput } from '../../../components/form';
import useLoader from '../../../hooks/useLoader';
import { createCard } from '../../../services/Flashcards/card.services';
import { getLabels } from '../../../services/Flashcards/label.services';
import { SelectOption } from '../../../types';
import LabelsSelect from './LabelsSelect';

interface AddCardFormProps {
  deckName: string;
  deckId: string;
  onSubmitForm: () => void;
}

function AddCardForm({ deckName, deckId, onSubmitForm }: AddCardFormProps) {
  const [formError, setFormError] = useState<undefined | string>();
  const [labels, setLabels] = useState<SelectOption[]>([]);
  const { isLoading, setLoading, getLoader } = useLoader();
  const nameInputRef = useRef<HTMLInputElement>(null);
  const contentInputRef = useRef<HTMLTextAreaElement>(null);
  const selectedLabels: string[] = [];

  async function fetchData() {
    const labelsData = await getLabels();
    setLabels(labelsData.map((label) => ({ label: label.name, value: label.id })));
  }

  async function addCardHandler(card: { name: string; content: string }) {
    await createCard(card);
  }

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const name = nameInputRef.current?.value;
    const content = contentInputRef.current?.value;

    const card = {
      name: name!,
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
    <Form onSubmit={submitHandler} onBlur={() => setFormError(undefined)}>
      <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', margin: '0', padding: '0' }}>
        <div>
          <TextInput label="Title" name="card-name" type="text" ref={nameInputRef} maxLength={25} required autoFocus />
        </div>
        <div>
          <TextInput label="Deck" name="deck-name" type="text" value={deckName} readOnly />
        </div>
      </div>
      <TextAreaInput label="Text" name="card-content" ref={contentInputRef} rows={4} cols={60} required />
      <LabelsSelect
        options={labels}
        onChange={(option: readonly SelectOption[] | SelectOption | null) => {
          (option as SelectOption[]).map((label: SelectOption) => selectedLabels.push(label.label));
        }}
        defaultValue={[]}
      />
      {formError && <FormError>{formError}</FormError>}
      <ActionButton style={{ margin: '25px 0 15px' }} type="submit">
        Add Card
      </ActionButton>
    </Form>
  );
}

export default AddCardForm;
