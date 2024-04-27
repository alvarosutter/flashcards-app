import { DashboardBar, FilterButton, SortSelect } from '../../../components/dashboard';
import type { SelectOption } from '../../../types';

interface ILabelDashboardBarProps {
  addItem: () => void;
  options: Array<SelectOption>;
  defaultValue: SelectOption;
  onChange: (option: SelectOption | ReadonlyArray<SelectOption> | null) => void;
  value: boolean;
  onClick: (value: boolean) => void;
}
function LabelDashboardBar({
  addItem,
  options,
  defaultValue,
  onChange,
  value,
  onClick,
}: ILabelDashboardBarProps) {
  return (
    <DashboardBar title="Labels" addItem={addItem}>
      <SortSelect options={options} defaultValue={defaultValue} onChange={onChange} />
      <FilterButton value={value} name="Empty" onClick={onClick} />
    </DashboardBar>
  );
}

export default LabelDashboardBar;
