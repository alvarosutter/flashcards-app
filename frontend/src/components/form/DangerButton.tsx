import styled from 'styled-components';

import Button from './Button';

const DangerButton = styled(Button)`
  color: ${({ theme }) => theme.colors.onDanger};
  background-color: ${({ theme }) => theme.colors.danger};
  &:hover {
    cursor: pointer;
    transform: scale(0.98);
    background-color: ${({ theme }) => theme.colors.dangerDarker};
  }
`;

export default DangerButton;
