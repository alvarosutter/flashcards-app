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
  &:hover {
    cursor: pointer;
    color: ${({ theme }) => theme.colors.primaryText};
  }
`;

interface TrashButtonProps {
  style?: React.CSSProperties;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClick: (e: any) => void;
}

function TrashButton({ style, onClick }: TrashButtonProps) {
  return (
    <Button style={style} onClick={onClick}>
      &times;
    </Button>
  );
}

export default TrashButton;
