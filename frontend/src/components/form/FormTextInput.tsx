import { forwardRef, InputHTMLAttributes, Ref } from 'react';
import styled from 'styled-components';

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 3px;
  width: 100%;
  padding: 15px 25px 0;
`;

const Label = styled.label`
  color: ${({ theme }) => theme.colors.primaryText};
  font-family: ${({ theme }) => theme.fonts.headersFont}, sans-serif;
  font-weight: ${({ theme }) => theme.fontWeights.normal};
  font-size: ${({ theme }) => theme.fontSizes.small};
  margin: 0;
  padding: 0;
`;

const Text = styled.input`
  color: ${({ theme }) => theme.colors.primaryText};
  background-color: ${({ theme }) => theme.colors.inputBg};
  border: none;
  font-family: ${({ theme }) => theme.fonts.textFont}, sans-serif;
  font-weight: ${({ theme }) => theme.fontWeights.light};
  font-size: ${({ theme }) => theme.fontSizes.small};
  height: 35px;
  margin: 0;
  padding: 5px 10px;
`;

const Checkbox = styled.input`
  align-self: center;
  accent-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.primaryText};
  background-color: ${({ theme }) => theme.colors.inputBg};
  height: 35px;
  width: 35px;
  margin: 0;
  padding: 0;
  cursor: pointer;
`;

interface IFormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
}

const FormTextInput = forwardRef(({ label, name, ...props }: IFormInputProps, ref: Ref<HTMLInputElement>) => (
  <InputWrapper>
    <Label htmlFor={name} style={props.type === 'checkbox' ? { textAlign: 'center' } : {}}>
      {label}
    </Label>
    {props.type === 'text' && <Text id={name} {...props} ref={ref} />}
    {props.type === 'checkbox' && <Checkbox id={name} {...props} ref={ref} />}
  </InputWrapper>
));
FormTextInput.displayName = 'FormTextInput';

export default FormTextInput;
