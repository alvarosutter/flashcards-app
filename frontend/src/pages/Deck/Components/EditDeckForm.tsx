import { useRef, useState } from 'react';
import styled from 'styled-components';
import { ActionButton, CancelButton, Form, FormError, FormTextInput } from '../../../components/form';
import { patchDeck } from '../../../services/Flashcards/deck.services';
import { Deck } from '../../../services/Flashcards/flashcardsUtils';
import FormCheckboxInput from '../../../components/form/FormCheckboxInput';

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

  async function editDeckHandler(editedDeck: { name: string; archived: boolean }) {
    await patchDeck(deck.id, editedDeck);
  }

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const name = nameInputRef.current?.value;
    const archived = archivedInputRef.current?.checked;

    const editedDeck = {
      name: name!,
      archived: archived!,
    };

    await editDeckHandler(editedDeck)
      .then(() => onSubmitForm())
      .catch(() => setFormError('Name is invalid or already exists'));
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
        <FormTextInput
          label="Name"
          name="deck-name"
          ref={nameInputRef}
          type="text"
          maxLength={15}
          defaultValue={deck.name}
          required
        />
        <FormCheckboxInput
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
