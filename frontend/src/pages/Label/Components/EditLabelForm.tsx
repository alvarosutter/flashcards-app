import { useRef, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import styled from 'styled-components';
import { ActionButton, CancelButton, Form, FormError, TextInput } from '../../../components/form';
import { patchLabel } from '../../../services/FlashcardsApi/label.services';
import { Label } from '../../../types';

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  gap: 25px;
  width: 100%;
  margin: 25px 0 15px;
  padding: 0px 15px;
`;

interface EditLabelFormProps {
  label: Label;
  onSubmitForm: () => void;
  onCancel: () => void;
}

function EditLabelForm({ label, onSubmitForm, onCancel }: EditLabelFormProps) {
  const [formError, setFormError] = useState<undefined | string>();
  const nameInputRef = useRef<HTMLInputElement>(null);

  const queryClient = useQueryClient();
  const { mutateAsync: patchLabelMutation } = useMutation({
    mutationFn: (body: { name: string }) => patchLabel(label.id, body),
    onSuccess: async (editedLabel) => {
      await queryClient.setQueryData(['labels', editedLabel.id], editedLabel);
      await queryClient.invalidateQueries({ queryKey: ['labels'], exact: true });
    },
  });
  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const name = nameInputRef.current?.value;

    const editedLabel = {
      name: name!,
    };

    await patchLabelMutation(editedLabel);
    onSubmitForm();
  };

  return (
    <Form onSubmit={submitHandler} onBlur={() => setFormError(undefined)}>
      <TextInput
        label="Name"
        name="label-name"
        ref={nameInputRef}
        type="text"
        maxLength={15}
        defaultValue={label.name}
        required
      />
      {formError && <FormError>{formError}</FormError>}
      <ButtonContainer>
        <CancelButton onClick={onCancel}>Cancel</CancelButton>
        <ActionButton type="submit">Edit Label</ActionButton>
      </ButtonContainer>
    </Form>
  );
}

export default EditLabelForm;
