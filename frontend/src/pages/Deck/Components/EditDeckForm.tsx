import { useState, useRef } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import styled from 'styled-components';
import { ActionButton, CancelButton, CheckboxInput, Form, FormError, TextInput } from '../../../components/form';
import { patchDeck } from '../../../services/FlashcardsApi/deck.services';
import { Deck } from '../../../types';

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
  margin: 25px 0 15px;
  padding: 0;
`;

interface EditDeckFormProps {
  deck: Deck;
  onSubmitForm: () => void;
  onCancel: () => void;
}

function EditDeckForm({ deck, onSubmitForm, onCancel }: EditDeckFormProps) {
  const [formError, setFormError] = useState<undefined | string>();
  const nameInputRef = useRef<HTMLInputElement>(null);
  const archivedInputRef = useRef<HTMLInputElement>(null);

  const queryClient = useQueryClient();
  const { mutateAsync: patchDeckMutation } = useMutation({
    mutationFn: (body: { name: string; archived: boolean }) => patchDeck(deck.id, body),
    onSuccess: async (editedDeck) => {
      await queryClient.setQueryData(['decks', editedDeck.id], editedDeck);
      await queryClient.invalidateQueries({ queryKey: ['decks'], exact: true });
    },
  });

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const name = nameInputRef.current?.value;
    const archived = archivedInputRef.current?.checked;

    const editedDeck = {
      name: name!,
      archived: archived!,
    };

    await patchDeckMutation(editedDeck);
    onSubmitForm();
  };

  return (
    <>
      <Form
        id="editDeck"
        onSubmit={submitHandler}
        onBlur={() => setFormError(undefined)}
        style={{
          flexDirection: 'row',
        }}
      >
        <TextInput
          label="Name"
          name="deck-name"
          ref={nameInputRef}
          type="text"
          maxLength={15}
          defaultValue={deck.name}
          required
        />
        <CheckboxInput
          label="Archived"
          name="deck-archived"
          ref={archivedInputRef}
          type="checkbox"
          defaultChecked={deck.archived}
        />
        {formError && <FormError>{formError}</FormError>}
      </Form>
      <ButtonContainer>
        <CancelButton onClick={onCancel}>Cancel</CancelButton>
        <ActionButton form="editDeck" type="submit">
          Edit Deck
        </ActionButton>
      </ButtonContainer>
    </>
  );
}

export default EditDeckForm;
