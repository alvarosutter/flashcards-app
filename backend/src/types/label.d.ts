import ILabelsOnCards from './labelOnCards';

interface ILabel {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  cards: ILabelsOnCards[];
}

interface IPatchLabel {
  id: string;
  name: string;
}

export { ILabel, IPatchLabel };
