import { useRef, useState } from 'react';
import styled from 'styled-components';
import { Form, FormButton, FormError, FormTextInput } from '../../../components/form';
import { Label } from '../../../services/Flashcards/flashcardsUtils';
import { patchLabel } from '../../../services/Flashcards/label.services';

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

  async function editLabelHandler(editedLabel: { labelName: string }) {
    await patchLabel(label.labelId, editedLabel);
  }

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const name = nameInputRef.current?.value;

    const editedLabel = {
      labelName: name!,
    };

    await editLabelHandler(editedLabel)
      .then(() => onSubmitForm())
      .catch(() => setFormError('Name is invalid or already exists'));
  };

  return (
    <Form onSubmit={submitHandler} onBlur={() => setFormError(undefined)}>
      <FormTextInput
        label="Name"
        name="label-name"
        ref={nameInputRef}
        type="text"
        maxLength={15}
        defaultValue={label.labelName}
        required
      />
      {formError && <FormError>{formError}</FormError>}
      <ButtonContainer>
        <FormButton onClick={onCancel}>Cancel</FormButton>
        <FormButton type="submit">Edit Label</FormButton>
      </ButtonContainer>
    </Form>
  );
}

export default EditLabelForm;
