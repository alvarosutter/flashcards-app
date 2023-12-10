import { styled } from 'styled-components';

const StyledButton = styled.button`
  color: ${({ theme }) => theme.colors.onButton};
  background-color: ${({ theme }) => theme.colors.button};
  border: none;
  outline: none;
  border-radius: 5px;
  font-family: ${({ theme }) => theme.fonts.headersFont}, sans-serif;
  font-weight: ${({ theme }) => theme.fontWeights.light};
  font-size: inherit;
  width: 110px;
  height: fit-content;
  margin: 0;
  padding: 7px 5px 3px;
  text-align: center;
  &:hover {
    cursor: pointer;
    transform: scale(0.98);
    background-color: ${({ theme }) => theme.colors.buttonDarker};
  }
`;

interface IFilterButtonProps {
  value: boolean;
  name: string;
  onClick: (value: boolean) => void;
}

function FilterButton({ value, name, onClick }: IFilterButtonProps) {
  return (
    <StyledButton onClick={() => onClick(!value)} title={`${value ? 'Hide' : 'Show'} ${name}`}>
      {value ? 'Hide' : 'Show'} {name}
    </StyledButton>
  );
}

export default FilterButton;
