import { forwardRef, Ref, TextareaHTMLAttributes } from 'react';
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

const TextArea = styled.textarea`
  color: ${({ theme }) => theme.colors.primaryText};
  background-color: ${({ theme }) => theme.colors.modalInputBg};
  border: none;
  font-family: ${({ theme }) => theme.fonts.btnFont}, sans-serif;
  font-weight: ${({ theme }) => theme.fontWeights.light};
  font-size: ${({ theme }) => theme.fontSizes.small};
  width: 100%;
  height: 200px;
  margin: 0;
  padding: 5px 10px;
`;

interface ITextAreaInputProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  name: string;
}

const TextAreaInput = forwardRef(
  ({ label, name, ...restProps }: ITextAreaInputProps, ref: Ref<HTMLTextAreaElement>) => (
    <InputWrapper>
      <Label htmlFor={name}>{label}</Label>
      <TextArea id={name} {...restProps} ref={ref} />
    </InputWrapper>
  ),
);
TextAreaInput.displayName = 'TextAreaInput';

export default TextAreaInput;
