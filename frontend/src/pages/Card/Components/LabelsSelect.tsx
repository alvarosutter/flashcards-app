import { styled } from 'styled-components';
import { ISelectProps } from '../../../types';
import SelectStyle from './SelectStyle';
import Select from '../../../components/ui/Select';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 3px;
  width: 100%;
  padding: 15px 25px 0;
`;

const Label = styled.label`
  color: ${({ theme }) => theme.colors.primaryText};
  margin: 0;
  padding: 0;
  font-size: 1.1em;
  font-family: ${({ theme }) => theme.fonts.btnFont}, sans-serif;
  user-select: none;
`;

function LabelsSelect({ options, defaultValue, onChange }: ISelectProps) {
  const selectStyle = SelectStyle();

  return (
    <Wrapper>
      <Label>Labels</Label>
      <Select
        defaultValue={defaultValue}
        style={selectStyle}
        options={options}
        name="select-card-labels"
        isMulti
        isSearchable
        isClearable
        isDisabled={false}
        onChange={onChange}
      />
    </Wrapper>
  );
}

export default LabelsSelect;
