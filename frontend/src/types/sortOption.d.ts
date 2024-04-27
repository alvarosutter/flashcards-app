import type { SelectOption } from './selectOption';

export type SortOption = {
  value: SelectOption;
  setValue: React.Dispatch<React.SetStateAction<SelectOption>>;
};
