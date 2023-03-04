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

interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
  children: React.ReactNode | React.ReactNode[];
}

function Form({ children, ...rest }: FormProps) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <FormStyle {...rest}>{children}</FormStyle>;
}

export default Form;
