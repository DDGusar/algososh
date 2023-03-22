import React, { useState, FormEvent } from "react";
import styles from "./sorting-page.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Column } from "../ui/column/column";
import { Direction } from "../../types/direction";
import { ElementStates } from "../../types/element-states";
import { swapItems, randomArr, delay } from "../../utils/utils";
import { DELAY_IN_MS } from "../../constants/delays";

export type TRandomArray = {
  value: number;
  color: ElementStates;
};

export const SortingPage: React.FC = () => {
  const [loader, setLoader] = useState<boolean[]>([false, false]);
  const [randomArray, setRandomArray] = useState<TRandomArray[]>(
    randomArr().map((value) => ({ value, color: ElementStates.Default }))
  );
  const [radioInputState, setRadioInputState] = useState<string>("choice");

  const onClickArray = (
    e: FormEvent<HTMLFormElement> | FormEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    setRandomArray(
      randomArr().map((value) => ({ value, color: ElementStates.Default }))
    );
  };

  const onClickDescending = (
    e: FormEvent<HTMLFormElement> | FormEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();

    radioInputState === "choice"
      ? selectionSort("descending")
      : bubbleSort("descending");
  };

  const onClickAscending = (
    e: FormEvent<HTMLFormElement> | FormEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();

    radioInputState === "bubble"
      ? bubbleSort("ascending")
      : selectionSort("ascending");
  };

  const onRadioInputClick = (
    e: FormEvent<HTMLFormElement> | FormEvent<HTMLInputElement>
  ) => {
    //React.ChangeEvent как в string
    setRadioInputState(e.currentTarget.value);
  };

  const bubbleSort = async (sortType: string) => {
    setLoader([sortType === "ascending", sortType === "descending"]);
    let { length } = randomArray;
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

  const selectionSort = async (sortType: string) => {
    setLoader([sortType === "ascending", sortType === "descending"]);
    let { length } = randomArray;
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

  return (
    <SolutionLayout title="Сортировка массива">
      <section className={`${styles.content}`}>
        <form className={`${styles.task}`}>
          <div className={`${styles.radioInputBox}`}>
            <RadioInput
              label="Выбор"
              extraClass="mr-40"
              name="sort"
              value="choice"
              disabled={loader[0] || loader[1]}
              onChange={onRadioInputClick}
              checked={radioInputState === "choice"}
            />
            <RadioInput
              label="Пузырёк"
              extraClass="mr-40"
              name="sort"
              value="bubble"
              disabled={loader[0] || loader[1]}
              onChange={onRadioInputClick}
              checked={radioInputState === "bubble"}
            />
          </div>
          <Button
            extraClass={`${styles.button}`}
            text="По возрастанию"
            type="button"
            sorting={Direction.Ascending}
            isLoader={loader[0]}
            disabled={loader[1]}
            onClick={onClickAscending}
          />
          <Button
            extraClass={`${styles.button}`}
            text="По убыванию"
            type="button"
            sorting={Direction.Descending}
            isLoader={loader[1]}
            disabled={loader[0]}
            onClick={onClickDescending}
          />
          <Button
            text="Новый массив"
            type="button"
            extraClass={`${styles.newArrowButton}`}
            disabled={loader[0] || loader[1]}
            onClick={onClickArray}
          />
        </form>
        <div className={`${styles.columns}`}>
          {randomArray &&
            randomArray.map((item, index) => (
              <Column index={item.value} state={item.color} key={index} />
            ))}
        </div>
      </section>
    </SolutionLayout>
  );
};
