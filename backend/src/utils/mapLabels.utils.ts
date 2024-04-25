import type LabelsOnCards from '../types/labelOnCards';

function mapLabels(labels: Array<LabelsOnCards>) {
  return labels.map((element) => element.label);
}

export default mapLabels;
