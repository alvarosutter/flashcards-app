import styled from 'styled-components';

const Button = styled.button`
  margin-left: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.altText};
  background: none;
  border: none;
  padding: 3px 4px;
  font-family: ${({ theme }) => theme.fonts.btnFont};
  font-size: ${({ theme }) => theme.fontSizes.small};
  font-weight: ${({ theme }) => theme.fontWeights.normal};
  &:hover {
    cursor: pointer;
    color: ${({ theme }) => theme.colors.danger};
  }
`;

function TrashButton({ onClick, ...restProps }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <Button onClick={onClick} {...restProps}>
      &times;
    </Button>
  );
}

export default TrashButton;
