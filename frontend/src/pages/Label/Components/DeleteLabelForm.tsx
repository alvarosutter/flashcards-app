import { useState } from 'react';
import styled from 'styled-components';
import { DangerButton, Form, CancelButton, FormError } from '../../../components/form';
import { deleteLabel } from '../../../services/Flashcards/label.services';
import { Label } from '../../../types';

const Text = styled.div`
  color: ${({ theme }) => theme.colors.primaryText};
  font-size: ${({ theme }) => theme.fontSizes.small};
  padding: 15px;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
  margin: 25px 0 15px;
  padding: 0;
`;

interface DeleteLabelFormProps {
  label: Label;
  onSubmitForm: () => void;
  onCancel: () => void;
}

function DeleteLabelForm({ label, onSubmitForm, onCancel }: DeleteLabelFormProps) {
  const [formError, setFormError] = useState<undefined | string>();

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await deleteLabel(label?.id)
      .then(() => onSubmitForm())
      .catch(() => setFormError('Label does not exists'));
  };

  return (
    <Form onSubmit={submitHandler} onBlur={() => setFormError(undefined)}>
      <Text>Are you sure you want to delete &apos;{label?.name}&apos; ?</Text>
      <ButtonContainer>
        <CancelButton onClick={onCancel}>Cancel</CancelButton>
        <DangerButton type="submit">Delete</DangerButton>
      </ButtonContainer>
      {formError && <FormError>{formError}</FormError>}
    </Form>
  );
}

export default DeleteLabelForm;
