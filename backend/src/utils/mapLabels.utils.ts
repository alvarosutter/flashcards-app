import { ILabelsOnCards } from '../models/interfaces.models';

function mapLabels(labels: ILabelsOnCards[]) {
  return labels.map((element) => element.label);
}

export default mapLabels;
