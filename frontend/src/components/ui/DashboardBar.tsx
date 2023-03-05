import styled, { useTheme } from 'styled-components';
import Select, { Option } from './Select';
import AddButton from './AddButton';
import GoBackButton from './GoBackButton';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  align-content: center;
  gap: 15px;
  width: 100%;
  height: fit-content;
  padding: 5px 5px;
  user-select: none;
  font-size: ${({ theme }) => theme.fontSizes.xsmall};
`;

const Title = styled.p`
  font-family: ${({ theme }) => theme.fonts.headersFont}, sans-serif;
  font-weight: ${({ theme }) => theme.fontWeights.light};
  font-size: ${({ theme }) => theme.fontSizes.small};
  padding: 0;
  margin: 0;
`;

const FilterButton = styled.button`
  color: ${({ theme }) => theme.colors.primaryText};
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
    filter: brightness(1.1);
  }
`;

const Divider = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.primary};
  width: 100%;
  margin: 5px auto;
`;

interface DashboardBarProps {
  title?: string;
  sortItems?: {
    options: Option[];
    defaultOption: Option;
    onChange: (option: Option | readonly Option[] | null) => void;
  };
  filterItems?: {
    value: boolean;
    name: string;
    onClick: (value: boolean) => void;
  };
  filterCards?: {
    options: Option[];
    defaultOption: Option;
    onChange: (option: Option | readonly Option[] | null) => void;
  };
  addItem?: () => void;
  goBack?: () => void;
}

function DashboardBar({ title, sortItems, filterItems, filterCards, addItem, goBack }: DashboardBarProps) {
  const theme = useTheme();
  /** Custom Style for React-Select */
  const customStyles = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    control: (provided: any, state: any) => ({
      ...provided,
      background: theme.colors.headerBg,
      border: 'none',
      width: '107px',
      height: 'fit-content',
      padding: '0px',
      margin: '0px',
      cursor: 'pointer',
      boxShadow: state.isFocused ? `0 0 0 1px ${theme.colors.primary}` : 'none',
      fontSize: 'inherit',
      fontFamily: theme.fonts.btnFont,
    }),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    menu: (provided: any) => ({
      ...provided,
      minWidth: 'fit-content',
      background: theme.colors.inputBg,
      boxShadow: `0 0 0 1px ${theme.colors.primary}`,
      fontSize: 'inherit',
      fontFamily: theme.fonts.btnFont,
      cursor: 'pointer',
    }),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    option: (provided: any) => ({
      ...provided,
      minWidth: 'fit-content',
      background: theme.colors.inputBg,
      '&:hover': {
        filter: 'brightness(1.5)',
      },
      fontSize: 'inherit',
      fontFamily: theme.fonts.btnFont,
      cursor: 'pointer',
    }),
  };

  return (
    <>
      <Container>
        {goBack && <GoBackButton title="Go back" onClick={() => goBack()} />}
        {title && <Title>{title}</Title>}
        {sortItems && (
          <Select
            style={customStyles}
            defaultValue={sortItems.defaultOption}
            options={sortItems.options}
            name="Sort"
            isMulti={false}
            isSearchable={false}
            isClearable={false}
            isDisabled={false}
            onChange={sortItems.onChange}
          />
        )}
        {filterItems && (
          <FilterButton
            onClick={() => filterItems.onClick(!filterItems.value)}
            title={`${filterItems.value ? 'Hide' : 'Show'} ${filterItems.name}`}
          >
            {filterItems.value ? 'Hide' : 'Show'} {filterItems.name}
          </FilterButton>
        )}
        {filterCards && (
          <Select
            style={customStyles}
            defaultValue={filterCards.defaultOption}
            options={filterCards.options}
            name="Filter Cards"
            isMulti={false}
            isSearchable
            isClearable={false}
            isDisabled={false}
            onChange={filterCards.onChange}
          />
        )}
        {addItem && <AddButton title={`Add ${title?.slice(0, -1) || 'Card'}`} onClick={() => addItem()} />}
      </Container>
      <Divider />
    </>
  );
}

export default DashboardBar;
