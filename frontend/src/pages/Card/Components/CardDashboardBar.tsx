import { styled } from 'styled-components';

import { DashboardBar, GoBackButton, SortSelect } from '../../../components/dashboard';
import type { SelectOption } from '../../../types';

const Title = styled.p`
  font-family: ${({ theme }) => theme.fonts.headersFont}, sans-serif;
  font-weight: ${({ theme }) => theme.fontWeights.light};
  font-size: ${({ theme }) => theme.fontSizes.small};
  padding: 0;
  margin: 0;
`;

interface ICardDashboardBarProps {
  title: string;
  addItem: (() => void) | undefined;
  sortOptions: Array<SelectOption>;
  sortDefaultValue: SelectOption;
  onChangeSort: (option: SelectOption | ReadonlyArray<SelectOption> | null) => void;
  goBack: () => void;
}

function CardDashboardBar({
  title,
  addItem,
  sortOptions,
  sortDefaultValue,
  onChangeSort,
  goBack,
}: ICardDashboardBarProps) {
  return (
    <DashboardBar addItem={addItem}>
      {goBack && <GoBackButton title="Go back" onClick={() => goBack()} />}
      <Title>{title}</Title>
      <SortSelect options={sortOptions} defaultValue={sortDefaultValue} onChange={onChangeSort} />
    </DashboardBar>
  );
}

export default CardDashboardBar;
