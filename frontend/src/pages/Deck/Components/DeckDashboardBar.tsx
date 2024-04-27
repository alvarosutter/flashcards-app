import { DashboardBar, FilterButton, SortSelect } from '../../../components/dashboard';
import type { SelectOption } from '../../../types';

interface IDeckDashboardBarProps {
  addItem: () => void;
  options: Array<SelectOption>;
  defaultValue: SelectOption;
  onChange: (option: SelectOption | ReadonlyArray<SelectOption> | null) => void;
  value: boolean;
  onClick: (value: boolean) => void;
}
function DeckDashboardBar({
  addItem,
  options,
  defaultValue,
  onChange,
  value,
  onClick,
}: IDeckDashboardBarProps) {
  return (
    <DashboardBar title="Decks" addItem={addItem}>
      <SortSelect options={options} defaultValue={defaultValue} onChange={onChange} />
      <FilterButton value={value} name="Archived" onClick={onClick} />
    </DashboardBar>
  );
}

export default DeckDashboardBar;
