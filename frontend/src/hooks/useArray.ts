/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';

function useArray(defaultValue: any) {
  const [array, setArray] = useState(defaultValue);

  function filter(callback: any) {
    setArray((arr: any[]) => arr.filter(callback));
  }

  function sort(callback: any) {
    setArray((arr: any[]) => arr.sort(callback));
  }

  function add(element: any) {
    setArray((arr: any[]) => [...arr, element]);
  }

  function update(index: number, element: any) {
    setArray((arr: any[]) => [...arr.slice(0, index), element, ...arr.slice(index + 1, arr.length - 1)]);
  }

  function remove(index: number) {
    setArray((arr: any[]) => [...arr.slice(0, index), ...arr.slice(index + 1, arr.length - 1)]);
  }

  function clear() {
    setArray([]);
  }

  return { array, set: setArray, filter, sort, add, update, remove, clear };
}

export default useArray;
