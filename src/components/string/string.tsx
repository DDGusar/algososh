import React, { FormEvent, useState } from "react";
import styles from "./string.module.css";
import { ElementStates } from "../../types/element-states";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { DELAY_IN_MS } from "../../constants/delays"; //можно убрать?
import { delay } from "../../utils/utils";
import { swapItems } from "../../utils/utils";

export type TCircleItem = {
  value: string;
  color: ElementStates;
};

export const StringComponent: React.FC = () => {
  const maxLength: number = 11;
  const [string, setString] = useState<string>("");
  const [circles, setCircles] = useState<Array<TCircleItem>>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setString(e.target.value);
  };

  const onSubmit = (
    e: FormEvent<HTMLFormElement> | FormEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    const word = string
      .split("")
      .map((value) => ({ value, color: ElementStates.Default }));
    // setString("");
    // setCircles([...word]);
    // console.log("circles0", circles);
    // console.log("word0", word);
    reverseString(word);
  };

  const reverseString = async (word: TCircleItem[]) => {
    setLoading(true);
    // console.log("circles1", circles);
    // await delay(DELAY_IN_MS);
    setCircles([...word]);
    await delay(DELAY_IN_MS);
    // console.log("circles2", circles);
    // console.log("word", word);
    for (
      let arr = circles, start = 0, end = circles.length - 1;
      end >= start;
      start++, end--
    ) {
      arr[start].color = ElementStates.Modified;
      arr[end].color = ElementStates.Modified;
      console.log(arr[start]);
      setCircles([...arr]);
      await delay(DELAY_IN_MS);
      swapItems(arr, start, end);
      arr[start].color = ElementStates.Changing;
      arr[end].color = ElementStates.Changing;
      setCircles([...arr]);
    }
    //algorithm
    // console.log(word);
    setLoading(false);
  };
  return (
    <SolutionLayout title="Строка">
      <section className={`${styles.content}`}>
        <form className={`${styles.task}`} onSubmit={onSubmit}>
          <Input
            isLimitText
            maxLength={maxLength}
            extraClass={`${styles.input}`}
            onChange={onChange}
          />
          <Button
            text="Развернуть"
            type="submit"
            disabled={string.length > 0 ? false : true}
            isLoader={loading}
          />
        </form>
        <div className={`${styles.decision}`}>
          {circles.map((letter, index) => (
            <Circle
              letter={String(letter.value)}
              key={index}
              state={letter.color}
            />
          ))}
        </div>
      </section>
    </SolutionLayout>
  );
};
