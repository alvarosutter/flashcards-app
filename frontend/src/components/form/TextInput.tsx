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
  background-color: ${({ theme }) => theme.colors.modalInputBg};
  border: none;
  font-family: ${({ theme }) => theme.fonts.textFont}, sans-serif;
  font-weight: ${({ theme }) => theme.fontWeights.light};
  font-size: ${({ theme }) => theme.fontSizes.small};
  height: 35px;
  margin: 0;
  padding: 5px 10px;
`;

interface ITextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
}

const TextInput = forwardRef(({ label, name, ...restProps }: ITextInputProps, ref: Ref<HTMLInputElement>) => (
  <InputWrapper>
    <Label htmlFor={name}>{label}</Label>
    <Text id={name} {...restProps} ref={ref} />
  </InputWrapper>
));
TextInput.displayName = 'TextInput';

export default TextInput;
