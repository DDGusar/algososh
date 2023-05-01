import React, { useState, FormEvent } from "react";
import styles from "./sorting-page.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Column } from "../ui/column/column";
import { Direction } from "../../types/direction";
import { ElementStates } from "../../types/element-states";
import { randomArr } from "../../utils/utils";
import { bubbleSort, selectionSort } from "./utils";

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

  const onSubmit = (
    e: FormEvent<HTMLFormElement> | FormEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
  };

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
      ? selectionSort("descending", randomArray, setRandomArray, setLoader)
      : bubbleSort("descending", randomArray, setRandomArray, setLoader);
  };

  const onClickAscending = (
    e: FormEvent<HTMLFormElement> | FormEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();

    radioInputState === "bubble"
      ? bubbleSort("ascending", randomArray, setRandomArray, setLoader)
      : selectionSort("ascending", randomArray, setRandomArray, setLoader);
  };

  const onRadioInputClick = (
    e: FormEvent<HTMLFormElement> | FormEvent<HTMLInputElement>
  ) => {
    setRadioInputState(e.currentTarget.value);
  };

  return (
    <SolutionLayout title="Сортировка массива">
      <section className={`${styles.content}`}>
        <form className={`${styles.task}`} onSubmit={onSubmit}>
          <div className={`${styles.radioInputBox}`}>
            <RadioInput
              data-testid="choice"
              label="Выбор"
              extraClass="mr-40"
              name="sort"
              value="choice"
              disabled={loader[0] || loader[1]}
              onChange={onRadioInputClick}
              checked={radioInputState === "choice"}
            />
            <RadioInput
              data-testid="bubble"
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
            data-testid="ascending"
            extraClass={`${styles.button}`}
            text="По возрастанию"
            type="button"
            sorting={Direction.Ascending}
            isLoader={loader[0]}
            disabled={loader[1]}
            onClick={onClickAscending}
          />
          <Button
            data-testid="descending"
            extraClass={`${styles.button}`}
            text="По убыванию"
            type="button"
            sorting={Direction.Descending}
            isLoader={loader[1]}
            disabled={loader[0]}
            onClick={onClickDescending}
          />
          <Button
            data-testid="newArr"
            text="Новый массив"
            type="button"
            extraClass={`${styles.newArrowButton}`}
            disabled={loader[0] || loader[1]}
            onClick={onClickArray}
          />
        </form>
        <div data-testid="column" className={`${styles.columns}`}>
          {randomArray &&
            randomArray.map((item, index) => (
              <Column index={item.value} state={item.color} key={index} />
            ))}
        </div>
      </section>
    </SolutionLayout>
  );
};
