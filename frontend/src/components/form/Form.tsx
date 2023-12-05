import { FormHTMLAttributes } from 'react';
import styled from 'styled-components';

const FormStyle = styled.form`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  user-select: none;
`;

interface IFormProps extends FormHTMLAttributes<HTMLFormElement> {
  children: React.ReactNode | React.ReactNode[];
}

function Form({ children, ...restProps }: IFormProps) {
  return <FormStyle {...restProps}>{children}</FormStyle>;
}

export default Form;
