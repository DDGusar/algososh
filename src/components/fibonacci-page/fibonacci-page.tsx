import React, { useState, FormEvent } from "react";
import styles from "./fibonacci-page.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { fibonacciMax } from "../../constants/const";

export const FibonacciPage: React.FC = () => {
  const [string, setString] = useState<string>(""); //может тут нужен кастомный хук?
  const [fibs, setFibs] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  //validation 19 max
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setString(e.target.value);
  };
  const onSubmit = (
    e: FormEvent<HTMLFormElement> | FormEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    setLoading(true);
    for (let i: number = 0, arr = []; i <= Number(string); i++) {
      arr.push(String(fib(i + 1)));
      setFibs(arr);
    }
    setLoading(false);
  };
  //animation!!!
  const fib = (n: number, memo: Record<number, number> = {}): number => {
    if (n in memo) {
      return memo[n];
    }
    if (n <= 2) {
      return 1;
    }
    memo[n] = fib(n - 1, memo) + fib(n - 2, memo);
    return memo[n];
  };

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <section className={`${styles.content}`}>
        <form className={`${styles.task}`} onSubmit={onSubmit}>
          <Input
            max={fibonacciMax}
            extraClass={`${styles.input}`}
            isLimitText
            type="max"
            onChange={onChange}
          />
          <Button
            text="Рассчитать"
            type="submit"
            isLoader={loading}
            disabled={string.length > 0 ? false : true}
          />
        </form>
        <div className={`${styles.decision}`}>
          {/* //доделать гриды */}
          {fibs.map((fib, index) => (
            <Circle index={index} key={index} letter={fib} />
          ))}
        </div>
      </section>
    </SolutionLayout>
  );
};
