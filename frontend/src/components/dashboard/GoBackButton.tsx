import styled from 'styled-components';

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.primaryText};
  background: none;
  border: none;
  &:hover {
    cursor: pointer;
    color: ${({ theme }) => theme.colors.accent};
  }
`;

function GoBackButton({ title, onClick, ...restProps }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <Button title={title} onClick={onClick} {...restProps}>
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
        <path
          fillRule="evenodd"
          // eslint-disable-next-line max-len
          d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
        />
      </svg>
    </Button>
  );
}

export default GoBackButton;
