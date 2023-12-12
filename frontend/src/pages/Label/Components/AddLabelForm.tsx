import { useRef, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createLabel } from '../../../services/FlashcardsApi/label.services';
import { Form, ActionButton, FormError, TextInput } from '../../../components/form';

interface AddLabelFormProps {
  onSubmitForm: () => void;
}

function AddLabelForm({ onSubmitForm }: AddLabelFormProps) {
  const [formError, setFormError] = useState<undefined | string>();
  const nameInputRef = useRef<HTMLInputElement>(null);

  const queryClient = useQueryClient();
  const { mutateAsync: createLabelMutation } = useMutation({
    mutationFn: createLabel,
    onSuccess: async (label) => {
      await queryClient.setQueryData(['labels', label.id], label);
      await queryClient.invalidateQueries({ queryKey: ['labels'], exact: true });
    },
  });

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const name = nameInputRef.current?.value;

    const label = {
      name: name!,
    };

    await createLabelMutation(label);
    onSubmitForm();
  };

  return (
    <Form onSubmit={submitHandler} onBlur={() => setFormError(undefined)}>
      <TextInput label="Name" name="label-name" ref={nameInputRef} type="text" maxLength={15} required autoFocus />
      {formError && <FormError>{formError}</FormError>}
      <ActionButton style={{ margin: '25px 0 15px' }} type="submit">
        Add Label
      </ActionButton>
    </Form>
  );
}

export default AddLabelForm;
