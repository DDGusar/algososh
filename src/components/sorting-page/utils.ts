import { TRandomArray } from "./sorting-page";
import { Dispatch, SetStateAction } from "react";
import { delay, swapItems } from "../../utils/utils";
import { ElementStates } from "../../types/element-states";
import { DELAY_IN_MS } from "../../constants/delays";

export const bubbleSort = async (
  sortType: string,
  randomArray: TRandomArray[],
  setRandomArray: Dispatch<SetStateAction<TRandomArray[]>>,
  setLoader: Dispatch<SetStateAction<boolean[]>>
) => {
  setLoader([sortType === "ascending", sortType === "descending"]);
  let { length } = randomArray;
  if (length < 3) return;
  {
    setLoader([false, false]);
  }
  randomArray.forEach((item) => (item.color = ElementStates.Default));
  await delay(DELAY_IN_MS);
  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length - i - 1; j++) {
      randomArray[j].color = ElementStates.Changing;
      randomArray[j + 1].color = ElementStates.Changing;
      setRandomArray([...randomArray]);
      if (
        sortType === "ascending"
          ? randomArray[j].value > randomArray[j + 1].value
          : randomArray[j].value < randomArray[j + 1].value
      ) {
        swapItems(randomArray, j, j + 1);
      }
      setRandomArray([...randomArray]);
      await delay(DELAY_IN_MS);
      randomArray[j].color = ElementStates.Default;
      randomArray[j + 1].color = ElementStates.Default;

      setRandomArray([...randomArray]);
    }
    randomArray[length - 1 - i].color = ElementStates.Modified;
  }
  randomArray[0].color = ElementStates.Modified;
  randomArray[1].color = ElementStates.Modified;
  setRandomArray([...randomArray]);
  setLoader([false, false]);
};

export const selectionSort = async (
  sortType: string,
  randomArray: TRandomArray[],
  setRandomArray: Dispatch<SetStateAction<TRandomArray[]>>,
  setLoader: Dispatch<SetStateAction<boolean[]>>
) => {
  setLoader([sortType === "ascending", sortType === "descending"]);
  let { length } = randomArray;
  if (length < 3) return;
  {
    setLoader([false, false]);
  }
  randomArray.forEach((item) => (item.color = ElementStates.Default));
  await delay(DELAY_IN_MS);
  for (let i = 0; i < length - 1; i++) {
    let ind = i;
    randomArray[i].color = ElementStates.Changing;
    setRandomArray([...randomArray]);
    for (let j = i + 1; j < length; j++) {
      randomArray[j].color = ElementStates.Changing;
      setRandomArray([...randomArray]);
      if (
        sortType === "ascending"
          ? randomArray[j].value < randomArray[ind].value
          : randomArray[j].value > randomArray[ind].value
      ) {
        ind = j;
      }
      await delay(DELAY_IN_MS);
      randomArray[j].color = ElementStates.Default;
      setRandomArray([...randomArray]);
    }
    swapItems(randomArray, i, ind);
    randomArray[ind].color = ElementStates.Default;
    randomArray[i].color = ElementStates.Modified;
    setRandomArray([...randomArray]);
  }
  randomArray[length - 1].color = ElementStates.Modified;
  setRandomArray([...randomArray]);
  setLoader([false, false]);
};
