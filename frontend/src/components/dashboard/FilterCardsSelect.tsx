import { ISelectProps } from '../../types';
import Select from '../ui/Select';

function FilterCardsSelect({ options, defaultValue, onChange }: ISelectProps) {
  return (
    <Select
      defaultValue={defaultValue}
      options={options}
      name="Filter Cards"
      isMulti={false}
      isSearchable
      isClearable={false}
      isDisabled={false}
      onChange={onChange}
    />
  );
}

export default FilterCardsSelect;
