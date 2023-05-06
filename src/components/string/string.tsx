import React, { FormEvent, useState } from "react";
import styles from "./string.module.css";
import { ElementStates } from "../../types/element-states";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { DELAY_IN_MS } from "../../constants/delays";
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
    const arr = string
      .split("")
      .map((value) => ({ value: value, color: ElementStates.Default }));
    setCircles(arr);
    reverseString(arr);
    setString("");
  };

  const reverseString = async (arr: TCircleItem[]) => {
    setLoading(true);
    let { length } = arr;
    await delay(DELAY_IN_MS);
    for (let start = 0, end = length - 1; end >= start; start++, end--) {
      arr[start].color = ElementStates.Changing;
      arr[end].color = ElementStates.Changing;
      setCircles([...arr]);
      await delay(DELAY_IN_MS);
      swapItems(arr, start, end);
      arr[start].color = ElementStates.Modified;
      arr[end].color = ElementStates.Modified;
      setCircles([...arr]);
    }
    setLoading(false);
  };
  return (
    <SolutionLayout title="Строка">
      <section className={`${styles.content}`}>
        <form className={`${styles.task}`} onSubmit={onSubmit}>
          <Input
            data-testid="value"
            value={string}
            isLimitText
            maxLength={maxLength}
            extraClass={`${styles.input}`}
            onChange={onChange}
            required
          />
          <Button
            data-testid="button"
            text="Развернуть"
            type="submit"
            disabled={!(string.length > 0)}
            isLoader={loading}
          />
        </form>
        <div className={`${styles.decision}`}>
          {circles &&
            circles.map((letter, index) => (
              <Circle
                data-testid="circle"
                letter={letter.value}
                key={index}
                state={letter.color}
              />
            ))}
        </div>
      </section>
    </SolutionLayout>
  );
};
