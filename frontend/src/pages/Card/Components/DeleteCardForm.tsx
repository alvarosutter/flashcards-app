import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteCard } from '../../../services/FlashcardsApi/card.services';
import { DeleteForm } from '../../../components/form';
import { Card, Deck } from '../../../types';

interface DeleteCardFormProps {
  card: Card;
  decks: Deck[];
  onSubmitForm: () => void;
  onCancel: () => void;
}

function DeleteCardForm({ card, decks, onSubmitForm, onCancel }: DeleteCardFormProps) {
  const [formError, setFormError] = useState<undefined | string>();
  const cardDeck = decks.find((deck) => deck.id === card.deckId)!;

  const queryClient = useQueryClient();

  const { mutateAsync: deleteCardMutation } = useMutation({
    mutationFn: deleteCard,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['decks'], exact: true });
      await queryClient.invalidateQueries({ queryKey: ['deck-cards', cardDeck.name], exact: true });
      await queryClient.invalidateQueries({ queryKey: ['label-cards'] });
      await queryClient.invalidateQueries({ queryKey: ['labels'], exact: true });
    },
  });
  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await deleteCardMutation(card.id);
    onSubmitForm();
  };

  return (
    <DeleteForm
      onSubmit={submitHandler}
      onBlur={() => setFormError(undefined)}
      onCancel={onCancel}
      formError={formError}
      name={card.name}
    />
  );
}

export default DeleteCardForm;
