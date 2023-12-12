import { styled } from 'styled-components';
import { FormHTMLAttributes } from 'react';
import CancelButton from './CancelButton';
import DangerButton from './DangerButton';
import Form from './Form';
import FormError from './FormError';

const Text = styled.div`
  color: ${({ theme }) => theme.colors.primaryText};
  font-size: ${({ theme }) => theme.fontSizes.small};
  padding: 15px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
  margin: 25px 0 15px;
  padding: 0;
`;

interface IDeleteFormProps extends FormHTMLAttributes<HTMLFormElement> {
  formError: string | undefined;
  name: string;
  onCancel: () => void;
}

function DeleteForm({ onSubmit, onBlur, onCancel, formError, name }: IDeleteFormProps) {
  return (
    <Form onSubmit={onSubmit} onBlur={onBlur}>
      <Text>Are you sure you want to delete &apos;{name}&apos; ?</Text>
      <Container>
        <CancelButton onClick={onCancel}>Cancel</CancelButton>
        <DangerButton type="submit">Delete</DangerButton>
      </Container>
      {formError && <FormError>{formError}</FormError>}
    </Form>
  );
}

export default DeleteForm;
