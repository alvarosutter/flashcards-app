export type SelectOption = {
  label: string;
  value: string;
};

export interface ISelectProps {
  options: SelectOption[];
  defaultValue: SelectOption | SelectOption[];
  onChange: (option: SelectOption | readonly SelectOption[] | null) => void;
}
