export type SelectOption = {
  label: string;
  value: string;
};

export interface ISelectProps {
  options: Array<SelectOption>;
  defaultValue: SelectOption | Array<SelectOption>;
  onChange: (option: SelectOption | ReadonlyArray<SelectOption> | null) => void;
}
