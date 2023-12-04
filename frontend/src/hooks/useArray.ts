import { useState } from 'react';

function useArray(defaultValue: Array<unknown>) {
  const [array, setArray] = useState(defaultValue);

  function filter(callback: (element?: unknown, index?: number, array?: Array<unknown>) => unknown) {
    setArray((arr: unknown[]) => arr.filter(callback));
  }

  function sort(callback: (a: unknown, b: unknown) => number) {
    setArray((arr: unknown[]) => arr.sort(callback));
  }

  function add(element: unknown) {
    setArray((arr: unknown[]) => [...arr, element]);
  }

  function update(index: number, element: unknown) {
    setArray((arr: unknown[]) => [...arr.slice(0, index), element, ...arr.slice(index + 1, arr.length - 1)]);
  }

  function remove(index: number) {
    setArray((arr: unknown[]) => [...arr.slice(0, index), ...arr.slice(index + 1, arr.length - 1)]);
  }

  function clear() {
    setArray([]);
  }

  return { array, set: setArray, filter, sort, add, update, remove, clear };
}

export default useArray;
