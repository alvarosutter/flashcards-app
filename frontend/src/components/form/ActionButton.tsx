import styled from 'styled-components';
import Button from './Button';

const ActionButton = styled(Button)`
  color: ${({ theme }) => theme.colors.onPrimary};
  background-color: ${({ theme }) => theme.colors.primary};
  &:hover {
    cursor: pointer;
    transform: scale(0.98);
    background-color: ${({ theme }) => theme.colors.primaryDarker};
  }
`;

export default ActionButton;
