import type { Deck, Label, SelectOption } from '../types';

function mapToSelectOptions(arr: Array<Deck | Label>): Array<SelectOption> {
  return arr.map((item) => ({ label: item.name, value: item.id }));
}

export default mapToSelectOptions;
