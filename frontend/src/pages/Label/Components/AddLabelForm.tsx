import { useRef, useState } from 'react';
import { createLabel } from '../../../services/Flashcards/label.services';
import { Form, FormButton, FormError, FormTextInput } from '../../../components/form';

interface AddLabelFormProps {
  onSubmitForm: () => void;
}

function AddLabelForm({ onSubmitForm }: AddLabelFormProps) {
  const [formError, setFormError] = useState<undefined | string>();
  const nameInputRef = useRef<HTMLInputElement>(null);

  async function addLabelHandler(label: { labelName: string }) {
    await createLabel(label);
  }

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const name = nameInputRef.current?.value;

    const label = {
      labelName: name!,
    };

    await addLabelHandler(label)
      .then(() => onSubmitForm())
      .catch(() => setFormError('Name is invalid or already exists'));
  };

  return (
    <Form onSubmit={() => submitHandler} onBlur={() => setFormError(undefined)}>
      <FormTextInput label="Name" name="label-name" ref={nameInputRef} type="text" maxLength={15} required autoFocus />
      {formError && <FormError>{formError}</FormError>}
      <FormButton style={{ margin: '25px 0 15px' }} type="submit">
        Add Label
      </FormButton>
    </Form>
  );
}

export default AddLabelForm;
