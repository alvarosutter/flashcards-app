import ILabelsOnCards from './labelOnCards';

interface ILabel {
  labelId: string;
  createdAt: Date;
  updatedAt: Date;
  labelName: string;
  cards: ILabelsOnCards[];
}

interface IPatchLabel {
  labelId: string;
  labelName: string;
}

export { ILabel, IPatchLabel };
