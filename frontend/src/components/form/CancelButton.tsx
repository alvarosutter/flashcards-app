import styled from 'styled-components';
import Button from './Button';

const CancelButton = styled(Button)`
  color: ${({ theme }) => theme.colors.onButton};
  background-color: ${({ theme }) => theme.colors.button};
  &:hover {
    cursor: pointer;
    transform: scale(0.98);
    background-color: ${({ theme }) => theme.colors.buttonDarker};
  }
`;

export default CancelButton;
