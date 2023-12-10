import DashboardBar from '../../../components/dashboard/DashboardBar';
import FilterButton from '../../../components/dashboard/FilterButton';
import SortSelect from '../../../components/dashboard/SortSelect';
import { SelectOption } from '../../../types';

interface ILabelDashboardBarProps {
  addItem: () => void;
  options: SelectOption[];
  defaultValue: SelectOption;
  onChange: (option: SelectOption | readonly SelectOption[] | null) => void;
  value: boolean;
  onClick: (value: boolean) => void;
}
function LabelDashboardBar({ addItem, options, defaultValue, onChange, value, onClick }: ILabelDashboardBarProps) {
  return (
    <DashboardBar title="Labels" addItem={addItem}>
      <SortSelect options={options} defaultValue={defaultValue} onChange={onChange} />
      <FilterButton value={value} name="Empty" onClick={onClick} />
    </DashboardBar>
  );
}

export default LabelDashboardBar;
