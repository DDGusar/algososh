import { TRandomArray } from "../components/sorting-page/sorting-page";
import { TCircleItem } from "../components/string/string";
import { minLen, maxLen, minItem, maxItem } from "../constants/const"; //подавать на вход?
export const swapItems = (
  arr: TCircleItem[] | TRandomArray[],
  i: number,
  j: number
): void => {
  const tmp = arr[i];

  arr[i] = arr[j];
  arr[j] = tmp;
};
export const delay = (ms: number) =>
  new Promise<void>((resolve) => {
    setTimeout(() => resolve(), ms);
  });

export const randomArr = (): number[] => {
  let arr: number[] = [];
  const random = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  let length = random(minLen, maxLen); //выскакивает 18й столбик
  for (let i: number = 0; i <= length; i++) {
    arr.push(random(minItem, maxItem));
  }
  return arr;
};
