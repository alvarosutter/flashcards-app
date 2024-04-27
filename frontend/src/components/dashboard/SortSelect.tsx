import type { ISelectProps } from '../../types';
import Select from '../ui/Select';

function SortSelect({ options, defaultValue, onChange }: ISelectProps) {
  return (
    <Select
      defaultValue={defaultValue}
      options={options}
      name="Sort"
      isMulti={false}
      isSearchable={false}
      isClearable={false}
      isDisabled={false}
      onChange={onChange}
    />
  );
}

export default SortSelect;
