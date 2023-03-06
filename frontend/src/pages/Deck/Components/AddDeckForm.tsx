import { useRef, useState } from 'react';
import { Form, FormButton, FormError, FormInput } from '../../../components/form';
import { createDeck } from '../../../services/Flashcards/deck.services';

interface AddDeckFormProps {
  onSubmitForm: () => void;
}

function AddDeckForm({ onSubmitForm }: AddDeckFormProps) {
  const [formError, setFormError] = useState<undefined | string>();
  const nameInputRef = useRef<HTMLInputElement>(null);
  const archivedInputRef = useRef<HTMLInputElement>(null);

  async function addDeckHandler(deck: { deckName: string; archived: boolean }) {
    await createDeck(deck);
  }

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const name = nameInputRef.current?.value;
    const archived = archivedInputRef.current?.checked;

    const deck = {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      deckName: name!,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
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
        <FormInput label="Name" name="deck-name" ref={nameInputRef} type="text" maxLength={15} required autoFocus />
        <FormInput label="Archived" name="deck-archived" ref={archivedInputRef} type="checkbox" />
        {formError && <FormError>{formError}</FormError>}
      </Form>
      <FormButton form="addDeck" style={{ margin: '25px 0 15px' }} type="submit">
        Add Deck
      </FormButton>
    </>
  );
}

export default AddDeckForm;
