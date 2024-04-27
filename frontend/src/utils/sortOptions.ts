import type { Deck, Card, Label } from '../types';

const sortOptions = [
  {
    label: 'Newest',
    value: 'newest',
    func: (a: Deck | Card | Label, b: Deck | Card | Label) =>
      new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
  },
  {
    label: 'Oldest',
    value: 'oldest',
    func: (a: Deck | Card | Label, b: Deck | Card | Label) =>
      new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime(),
  },
  {
    label: 'A to Z',
    value: 'AtoZ',
    func: (a: Deck | Card | Label, b: Deck | Card | Label) => a.name.localeCompare(b.name),
  },
  {
    label: 'Z to A',
    value: 'ZtoA',
    func: (a: Deck | Card | Label, b: Deck | Card | Label) => b.name.localeCompare(a.name),
  },
];

const sortDefaultOption = {
  label: sortOptions[0].label,
  value: sortOptions[0].value,
};

export { sortOptions, sortDefaultOption };
