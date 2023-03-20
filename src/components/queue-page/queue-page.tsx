import React from "react";
import styles from "./queue-page.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { Circle } from "../ui/circle/circle";

export const QueuePage: React.FC = () => {
  return (
    <SolutionLayout title="Очередь">
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
          <Circle index={0} letter={"1"} head={"head"} tail={"tail"} />
        </div>
      </div>
    </SolutionLayout>
  );
};
