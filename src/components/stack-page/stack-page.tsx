import React from "react";
import styles from "./stack-page.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";

export const StackPage: React.FC = () => {
  return (
    <SolutionLayout title="Стек">
      <div className={`${styles.content}`}>
        <div className={`${styles.task}`}>
          <Input
            max={4}
            extraClass={`${styles.input}`}
            isLimitText
            type="max"
          />
          <Button text="Развернуть" />
          <Button text="Удалить" />
          <Button text="Очистить" extraClass={`${styles.button_clean}`} />
        </div>
        <div className={`${styles.decision}`}>
          <Circle index={0} letter={"1"} head={"top"} />
        </div>
      </div>
    </SolutionLayout>
  );
};
