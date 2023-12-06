import ILabelsOnCards from '../types/labelOnCards';

function mapLabels(labels: ILabelsOnCards[]) {
  return labels.map((element) => element.label);
}

export default mapLabels;
