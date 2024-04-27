import type { InputHTMLAttributes, Ref } from 'react';
import { forwardRef } from 'react';
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
  accent-color: ${({ theme }) => theme.colors.accent};
  height: 35px;
  width: 35px;
  margin: 0;
  padding: 0;
  cursor: pointer;
`;

interface ICheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
}

const CheckboxInput = forwardRef(
  (
    { label, name, type = 'checkbox', defaultChecked = false }: ICheckboxProps,
    ref: Ref<HTMLInputElement>,
  ) => (
    <InputWrapper>
      <Label htmlFor={name}>{label}</Label>
      <Checkbox id={name} type={type} ref={ref} defaultChecked={defaultChecked} />
    </InputWrapper>
  ),
);
CheckboxInput.displayName = 'CheckboxInput';

export default CheckboxInput;
