import { useRef, useState } from 'react';
import styled from 'styled-components';
import Form from '../../../components/form/Form';
import { FormButton } from '../../../components/form/FormButton';
import FormError from '../../../components/form/FormError';
import { FormInput } from '../../../components/form/FormInput';
import { patchDeck } from '../../../services/Flashcards/deck.services';
import { Deck } from '../../../services/Flashcards/flashcardsUtils';

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
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

  async function editDeckHandler(editedDeck: { deckName: string; archived: boolean }) {
    await patchDeck(deck.deckId, editedDeck);
  }

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const name = nameInputRef.current?.value;
    const archived = archivedInputRef.current?.checked;

    const editedDeck = {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      deckName: name!,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
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
        <FormInput
          label="Name"
          name="deck-name"
          ref={nameInputRef}
          type="text"
          maxLength={15}
          defaultValue={deck.deckName}
          required
        />
        <FormInput
          label="Archived"
          name="deck-archived"
          ref={archivedInputRef}
          type="checkbox"
          defaultChecked={deck.archived}
        />
        {formError && <FormError>{formError}</FormError>}
      </Form>
      <ButtonContainer>
        <FormButton onClick={onCancel}>Cancel</FormButton>
        <FormButton form="editDeck" type="submit">
          Edit Deck
        </FormButton>
      </ButtonContainer>
    </>
  );
}

export default EditDeckForm;
