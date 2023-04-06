import React, { FormEvent, useState } from "react";
import styles from "./stack-page.module.css";
import { ElementStates } from "../../types/element-states";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Stack } from "./utils";
import { delay } from "../../utils/utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

export type TItem = {
  value: string;
  color: ElementStates;
};
//валидацию на ввод только цифр
export const StackPage: React.FC = () => {
  const [disabled, setDisabled] = useState<boolean>(true);
  const [string, setString] = useState<string>("");
  const [circles, setCircles] = useState<TItem[]>([]);
  //есть ли ограничение на длину стека
  const stack = React.useMemo(() => {
    return new Stack<TItem>();
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setString(e.target.value);
  };

  const onClickPush = async (
    e: FormEvent<HTMLFormElement> | FormEvent<HTMLButtonElement>
  ) => {
    stack.push({ value: string, color: ElementStates.Default });
    setString("");
    const top = stack.peak();
    setCircles([
      ...circles,
      { value: top?.value ? top.value : "", color: ElementStates.Changing },
    ]);
    await delay(SHORT_DELAY_IN_MS);
    setCircles([
      ...circles,
      { value: top?.value ? top.value : "", color: ElementStates.Default },
    ]);
    await delay(SHORT_DELAY_IN_MS);
    setDisabled(false);
  };

  const onClickPop = async () => {
    circles[circles.length - 1].color = ElementStates.Changing;
    setCircles([...circles]);
    await delay(SHORT_DELAY_IN_MS);
    stack.pop();
    setCircles([...stack.getItems()]);
    await delay(SHORT_DELAY_IN_MS);
    if (stack.getSize() === 0) {
      setDisabled(true);
    }
  };

  const onClickClear = async () => {
    for (let i = 0, j = stack.getSize(); i <= j; i++) {
      stack.pop();
    }
    setCircles([...stack.getItems()]);
    await delay(SHORT_DELAY_IN_MS);
    setDisabled(true);
  };

  return (
    <SolutionLayout title="Стек">
      <section className={`${styles.content}`}>
        <form className={`${styles.task}`}>
          <Input
            value={string}
            extraClass={`${styles.input}`}
            isLimitText
            type="text"
            maxLength={4}
            onChange={onChange}
            required
          />
          <Button
            text="Добавить"
            type="button"
            disabled={!(string.length > 0)}
            onClick={onClickPush}
          />
          <Button
            text="Удалить"
            type="button"
            disabled={disabled}
            onClick={onClickPop}
          />
          <Button
            text="Очистить"
            type="button"
            extraClass={`${styles.button_clean}`}
            disabled={disabled}
            onClick={onClickClear}
          />
        </form>
        <div className={`${styles.decision}`}>
          {circles &&
            circles.map((letter, index) => (
              <Circle
                letter={letter.value}
                key={index}
                state={letter.color}
                index={index}
                head={stack.getSize() - 1 === index ? "top" : ""}
              />
            ))}
        </div>
      </section>
    </SolutionLayout>
  );
};
