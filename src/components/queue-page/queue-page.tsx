import React, { useState, FormEvent } from "react";
import styles from "./queue-page.module.css";
import { ElementStates } from "../../types/element-states";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { Circle } from "../ui/circle/circle";
import { Queue } from "./utils";
import { delay } from "../../utils/utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { HEAD, TAIL } from "../../constants/element-captions";
import { queueLength } from "../../constants/const";

export type TItem = {
  value: string;
  color: ElementStates;
};

export const QueuePage: React.FC = () => {
  const [disabled, setDisabled] = useState<boolean>(true);
  const [string, setString] = useState<string>("");
  const [circles, setCircles] = useState<TItem[]>(
    Array(queueLength).fill({ value: "", color: ElementStates.Default })
  );
  const [loadEnqueue, setLoadEnqueue] = useState<boolean>(false);
  const [loadDequeue, setLoadDequeue] = useState<boolean>(false);

  const queue = React.useMemo(() => {
    return new Queue<TItem>(queueLength);
  }, []);

  const onSubmit = (
    e: FormEvent<HTMLFormElement> | FormEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    onClickEnqueue();
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setString(e.target.value);
  };

  const onClickEnqueue = async () => {
    setLoadEnqueue(true);
    queue.enqueue({ value: string, color: ElementStates.Default });
    circles[queue.getTail() - 1] = {
      value: string,
      color: ElementStates.Changing,
    };
    setCircles([...circles]);
    setString("");
    await delay(SHORT_DELAY_IN_MS);
    circles[queue.getTail() - 1] = {
      value: string,
      color: ElementStates.Default,
    };
    setCircles([...circles]);
    await delay(SHORT_DELAY_IN_MS);
    setDisabled(false);
    setLoadEnqueue(false);
  };

  const onClickDequeue = async () => {
    setLoadDequeue(true);
    circles[queue.getHead()].color = ElementStates.Changing;
    setCircles([...circles]);
    await delay(SHORT_DELAY_IN_MS);
    circles[queue.getHead()].value = "";
    circles[queue.getHead()].color = ElementStates.Default;
    queue.dequeue();
    setCircles([...circles]);
    if (queue.isEmpty()) {
      setDisabled(true);
    }
    setLoadDequeue(false);
  };
  const onClickClear = async () => {
    queue.clear();
    setCircles(
      Array(queueLength).fill({ value: "", color: ElementStates.Default })
    );
  };

  return (
    <SolutionLayout title="Очередь">
      <section className={`${styles.content}`}>
        <form className={`${styles.task}`} onSubmit={onSubmit}>
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
            onClick={onClickEnqueue}
            isLoader={loadEnqueue}
          />
          <Button
            text="Удалить"
            type="button"
            disabled={disabled}
            onClick={onClickDequeue}
            isLoader={loadDequeue}
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
          {circles.map((item, index) => {
            return (
              <Circle
                letter={item.value}
                state={item.color}
                head={
                  (index === queue.getHead() && !queue.isEmpty()) ||
                  (index === 6 &&
                    queue.isEmpty() &&
                    queue.getHead() === queueLength)
                    ? HEAD
                    : ""
                }
                tail={
                  index === queue.getTail() - 1 && !queue.isEmpty() ? TAIL : ""
                }
                key={index}
                index={index}
              />
            );
          })}
        </div>
      </section>
    </SolutionLayout>
  );
};
