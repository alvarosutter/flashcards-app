import Select, { GroupBase, StylesConfig } from 'react-select';
import styled from 'styled-components';

export type Option = {
  label: string;
  value: string;
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 3px;
  width: 100%;
  padding: 15px 25px 0;
`;

const SelectLabel = styled.label`
  color: ${({ theme }) => theme.colors.primaryText};
  margin: 0;
  padding: 0;
  font-size: 1.1em;
  font-family: ${({ theme }) => theme.fonts.btnFont}, sans-serif;
  user-select: none;
`;

const Label = styled.p`
  color: ${({ theme }) => theme.colors.primaryText};
  background: none;
  padding: 0;
  margin: 0;
  font-size: 1em;
  font-family: ${({ theme }) => theme.fonts.btnFont}, sans-serif;
  font-weight: 300;
  user-select: none;
`;

const formatOptionLabel = ({ label }: Option) => <Label>{label}</Label>;

interface MySelectProps {
  style?: StylesConfig<Option, boolean, GroupBase<Option>>;
  options: Option[];
  defaultValue?: Option | Option[];
  name: string;
  isMulti: boolean;
  isSearchable: boolean;
  isClearable: boolean;
  isDisabled: boolean;
  onChange: (option: Option | readonly Option[] | null) => void;
  selectLabel?: string;
}

function MySelect({
  style = {},
  options,
  // eslint-disable-next-line react/require-default-props
  defaultValue,
  name,
  isMulti,
  isSearchable,
  isClearable,
  isDisabled,
  onChange,
  selectLabel = '',
}: MySelectProps) {
  const select = (
    <Select
      styles={style}
      formatOptionLabel={formatOptionLabel}
      options={options}
      defaultValue={defaultValue}
      name={name}
      isMulti={isMulti}
      isSearchable={isSearchable}
      isClearable={isClearable}
      isDisabled={isDisabled}
      onChange={onChange}
    />
  );
  const selectWithLabel = (
    <Wrapper>
      <SelectLabel>{selectLabel}</SelectLabel>
      {select}
    </Wrapper>
  );

  return selectLabel ? selectWithLabel : select;
}

export default MySelect;
