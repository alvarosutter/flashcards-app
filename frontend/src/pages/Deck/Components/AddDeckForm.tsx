import { useRef, useState } from 'react';
import { Form, ActionButton, FormError, FormTextInput } from '../../../components/form';
import { createDeck } from '../../../services/Flashcards/deck.services';
import FormCheckboxInput from '../../../components/form/FormCheckboxInput';

interface AddDeckFormProps {
  onSubmitForm: () => void;
}

function AddDeckForm({ onSubmitForm }: AddDeckFormProps) {
  const [formError, setFormError] = useState<undefined | string>();
  const nameInputRef = useRef<HTMLInputElement>(null);
  const archivedInputRef = useRef<HTMLInputElement>(null);

  async function addDeckHandler(deck: { name: string; archived: boolean }) {
    await createDeck(deck);
  }

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const name = nameInputRef.current?.value;
    const archived = archivedInputRef.current?.checked;

    const deck = {
      name: name!,
      archived: archived!,
    };

    await addDeckHandler(deck)
      .then(() => onSubmitForm())
      .catch(() => setFormError('Name is invalid or already exists'));
  };

  return (
    <>
      <Form
        id="addDeck"
        onSubmit={submitHandler}
        onBlur={() => setFormError(undefined)}
        style={{ flexDirection: 'row' }}
      >
        <FormTextInput label="Name" name="deck-name" ref={nameInputRef} type="text" maxLength={15} required autoFocus />
        <FormCheckboxInput label="Archived" name="deck-archived" ref={archivedInputRef} type="checkbox" />
        {formError && <FormError>{formError}</FormError>}
      </Form>
      <ActionButton form="addDeck" style={{ margin: '25px 0 15px' }} type="submit">
        Add Deck
      </ActionButton>
    </>
  );
}

export default AddDeckForm;
