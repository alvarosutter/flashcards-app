import { useState } from 'react';
import { Deck, Card, Label } from '../types';

function useArray(defaultValue: Array<Deck | Card | Label>) {
  const [array, setArray] = useState(defaultValue);

  function filter(
    callback: (
      element?: Deck | Card | Label,
      index?: number,
      array?: Array<Deck | Card | Label>,
    ) => Deck | Card | Label,
  ) {
    setArray((arr: Array<Deck | Card | Label>) => arr.filter(callback));
  }

  function sort(callback: (a: Deck | Card | Label, b: Deck | Card | Label) => number) {
    setArray((arr: Array<Deck | Card | Label>) => arr.sort(callback));
  }

  function add(element: Deck | Card | Label) {
    setArray((arr: Array<Deck | Card | Label>) => [...arr, element]);
  }

  function update(index: number, element: Deck | Card | Label) {
    setArray((arr: Array<Deck | Card | Label>) => [
      ...arr.slice(0, index),
      element,
      ...arr.slice(index + 1, arr.length - 1),
    ]);
  }

  function remove(index: number) {
    setArray((arr: Array<Deck | Card | Label>) => [...arr.slice(0, index), ...arr.slice(index + 1, arr.length - 1)]);
  }

  function clear() {
    setArray([]);
  }

  return { array, set: setArray, filter, sort, add, update, remove, clear };
}

export default useArray;
