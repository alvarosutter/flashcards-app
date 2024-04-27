import type { FormHTMLAttributes, ReactNode } from 'react';
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
  children: ReactNode | Array<ReactNode>;
}

function Form({ children, ...restProps }: IFormProps) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <FormStyle {...restProps}>{children}</FormStyle>;
}

export default Form;
