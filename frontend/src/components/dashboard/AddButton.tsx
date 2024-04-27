import styled from 'styled-components';

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.primaryText};
  background: none;
  border: none;
  margin-left: auto;
  &:hover {
    cursor: pointer;
    color: ${(styledProps) => styledProps.theme.colors.accent};
  }
`;

function AddButton({ onClick, title }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <Button onClick={onClick} aria-label={title}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="currentColor"
        viewBox="0 0 16 16"
      >
        <path
          fillRule="evenodd"
          d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"
        />
      </svg>
    </Button>
  );
}

export default AddButton;
