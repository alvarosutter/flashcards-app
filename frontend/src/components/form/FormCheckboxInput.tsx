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
  text-align: center;
  margin: 0;
  padding: 0;
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

const FormCheckboxInput = forwardRef(({ label, name, ...restProps }: IFormInputProps, ref: Ref<HTMLInputElement>) => (
  <InputWrapper>
    <Label htmlFor={name}>{label}</Label>
    <Checkbox id={name} {...restProps} ref={ref} />
  </InputWrapper>
));
FormCheckboxInput.displayName = 'FormCheckboxInput';

export default FormCheckboxInput;
