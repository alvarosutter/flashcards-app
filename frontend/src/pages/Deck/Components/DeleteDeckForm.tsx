import { useState } from 'react';
import styled from 'styled-components';
import { DangerButton, Form, FormButton, FormError } from '../../../components/form';
import { deleteDeck } from '../../../services/Flashcards/deck.services';
import { Deck } from '../../../services/Flashcards/flashcardsUtils';

const Text = styled.div`
  color: ${({ theme }) => theme.colors.primaryText};
  font-size: ${({ theme }) => theme.fontSizes.small};
  padding: 15px;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
  width: 100%;
  margin: 25px 0 15px;
  padding: 0;
`;

interface DeleteDeckFormProps {
  deck: Deck;
  onSubmitForm: () => void;
  onCancel: () => void;
}

function DeleteDeckForm({ deck, onSubmitForm, onCancel }: DeleteDeckFormProps) {
  const [formError, setFormError] = useState<undefined | string>();

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await deleteDeck(deck?.deckId)
      .then(() => onSubmitForm())
      .catch(() => setFormError('Deck does not exists'));
  };

  return (
    <Form onSubmit={() => submitHandler} onBlur={() => setFormError(undefined)}>
      <Text>Are you sure you want to delete &apos;{deck?.deckName}&apos; ?</Text>
      <ButtonContainer>
        <FormButton onClick={onCancel}>No</FormButton>
        <DangerButton type="submit">Yes</DangerButton>
      </ButtonContainer>
      {formError && <FormError>{formError}</FormError>}
    </Form>
  );
}

export default DeleteDeckForm;
