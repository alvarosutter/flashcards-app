import { useState, useRef } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Form, TextInput, CheckboxInput, FormError, ActionButton } from '../../../components/form';
import { createDeck } from '../../../services/FlashcardsApi/deck.services';

interface AddDeckFormProps {
  onSubmitForm: () => void;
}

function AddDeckForm({ onSubmitForm }: AddDeckFormProps) {
  const [formError, setFormError] = useState<undefined | string>();
  const nameInputRef = useRef<HTMLInputElement>(null);
  const archivedInputRef = useRef<HTMLInputElement>(null);

  const queryClient = useQueryClient();
  const { mutateAsync: createDeckMutation } = useMutation({
    mutationFn: createDeck,
    onSuccess: async (deck) => {
      await queryClient.setQueryData(['decks', deck.id], deck);
      await queryClient.invalidateQueries({ queryKey: ['decks'], exact: true });
    },
  });

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const name = nameInputRef.current?.value;
    const archived = archivedInputRef.current?.checked;

    const deck = {
      name: name!,
      archived: archived!,
    };

    await createDeckMutation(deck);
    onSubmitForm();
  };

  return (
    <>
      <Form
        id="addDeck"
        onSubmit={submitHandler}
        onBlur={() => setFormError(undefined)}
        style={{ flexDirection: 'row' }}
      >
        <TextInput label="Name" name="deck-name" ref={nameInputRef} type="text" maxLength={15} required autoFocus />
        <CheckboxInput label="Archived" name="deck-archived" ref={archivedInputRef} type="checkbox" />
        {formError && <FormError>{formError}</FormError>}
      </Form>
      <ActionButton form="addDeck" style={{ margin: '25px 0 15px' }} type="submit">
        Add Deck
      </ActionButton>
    </>
  );
}

export default AddDeckForm;
