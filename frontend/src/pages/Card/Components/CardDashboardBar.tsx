import DashboardBar from '../../../components/dashboard/DashboardBar';
import FilterCardsSelect from '../../../components/dashboard/FilterCardsSelect';
import SortSelect from '../../../components/dashboard/SortSelect';
import { SelectOption } from '../../../types';

interface ICardDashboardBarProps {
  addItem: (() => void) | undefined;
  sortOptions: SelectOption[];
  sortDefaultValue: SelectOption;
  onChangeSort: (option: SelectOption | readonly SelectOption[] | null) => void;
  filterOptions: SelectOption[];
  filterDefaultValue: SelectOption;
  onChangeFilter: (option: SelectOption | readonly SelectOption[] | null) => void;
  goBack: () => void;
}
function CardDashboardBar({
  addItem,
  sortOptions,
  sortDefaultValue,
  onChangeSort,
  filterOptions,
  filterDefaultValue,
  onChangeFilter,
  goBack,
}: ICardDashboardBarProps) {
  return (
    <DashboardBar title="" addItem={addItem} goBack={goBack}>
      <SortSelect options={sortOptions} defaultValue={sortDefaultValue} onChange={onChangeSort} />
      <FilterCardsSelect options={filterOptions} defaultValue={filterDefaultValue} onChange={onChangeFilter} />
    </DashboardBar>
  );
}

export default CardDashboardBar;
