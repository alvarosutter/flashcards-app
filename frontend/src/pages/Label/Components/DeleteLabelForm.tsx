import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { DeleteForm } from '../../../components/form';
import { deleteLabel } from '../../../services/FlashcardsApi/label.services';
import { Label } from '../../../types';

interface DeleteLabelFormProps {
  label: Label;
  onSubmitForm: () => void;
  onCancel: () => void;
}

function DeleteLabelForm({ label, onSubmitForm, onCancel }: DeleteLabelFormProps) {
  const [formError, setFormError] = useState<undefined | string>();

  const queryClient = useQueryClient();
  const { mutateAsync: deleteLabelMutation } = useMutation({
    mutationFn: deleteLabel,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['labels'], exact: true });
    },
  });

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await deleteLabelMutation(label.id);
    onSubmitForm();
  };

  return (
    <DeleteForm
      onSubmit={submitHandler}
      onBlur={() => setFormError(undefined)}
      onCancel={onCancel}
      formError={formError}
      name={label.name}
    />
  );
}

export default DeleteLabelForm;
