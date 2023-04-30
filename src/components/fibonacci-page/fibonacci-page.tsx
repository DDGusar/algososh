import React, { useState, FormEvent } from "react";
import styles from "./fibonacci-page.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { fibonacciMax } from "../../constants/const";
import { delay } from "../../utils/utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

export const FibonacciPage: React.FC = () => {
  const [string, setString] = useState<string>("");
  const [fibs, setFibs] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [inputValidity, setInputValidity] = useState<boolean>(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValidity(e.target.validity.valid);
    setString(e.target.value);
  };
  const onSubmit = (
    e: FormEvent<HTMLFormElement> | FormEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    animationFib();
    setString("");
  };

  const animationFib = async () => {
    setLoading(true);
    for (let i: number = 0, arr = []; i <= Number(string); i++) {
      arr.push(String(getFibonacciNumbers(i + 1)));
      setFibs([...arr]);
      await delay(SHORT_DELAY_IN_MS);
    }
    setLoading(false);
  };

  const getFibonacciNumbers = (
    n: number,
    memo: Record<number, number> = {}
  ): number => {
    if (n in memo) {
      return memo[n];
    }
    if (n <= 2) {
      return 1;
    }
    memo[n] =
      getFibonacciNumbers(n - 1, memo) + getFibonacciNumbers(n - 2, memo);
    return memo[n];
  };

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <section className={`${styles.content}`}>
        <form className={`${styles.task}`} onSubmit={onSubmit}>
          <Input
            data-testid="value"
            value={string}
            type="number"
            min={0}
            max={fibonacciMax}
            step={1}
            extraClass={`${styles.input}`}
            isLimitText
            onChange={onChange}
            required
          />
          <Button
            data-testid="button"
            text="Рассчитать"
            type="submit"
            isLoader={loading}
            disabled={!inputValidity}
          />
        </form>
        <div className={`${styles.decision}`}>
          {fibs &&
            fibs.map((fib, index) => (
              <Circle index={index} key={index} letter={fib} />
            ))}
        </div>
      </section>
    </SolutionLayout>
  );
};
