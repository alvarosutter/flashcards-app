import { Deck, Label, SelectOption } from '../types';

function mapToSelectOptions(arr: (Deck | Label)[]): SelectOption[] {
  return arr.map((item) => ({ label: item.name, value: item.id }));
}

export default mapToSelectOptions;
