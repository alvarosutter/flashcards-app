import type LabelsOnCards from './labelOnCards';

type Label = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  cards: Array<LabelsOnCards>;
};

type PatchLabel = {
  id: string;
  name: string;
};

export { Label, PatchLabel };
