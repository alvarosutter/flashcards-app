import styled from 'styled-components';

const Button = styled.button`
  align-self: center;
  color: ${({ theme }) => theme.colors.onButton};
  background-color: ${({ theme }) => theme.colors.button};
  border: none;
  border-radius: 10px;
  width: 110px;
  height: fit-content;
  padding: 8px 5px 5px;
  font-family: ${({ theme }) => theme.fonts.btnFont}, sans-serif;
  font-weight: ${({ theme }) => theme.fontWeights.normal};
  font-size: ${({ theme }) => theme.fontSizes.small};
  text-align: center;
  user-select: none;
  &:hover {
    cursor: pointer;
    transform: scale(0.98);
    filter: brightness(1.1);
  }
`;

export function FormButton(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <Button {...props} />;
}

export const DangerButton = styled(FormButton)`
  color: ${({ theme }) => theme.colors.onDanger};
  background-color: ${({ theme }) => theme.colors.danger};
`;
