import React, { useState, FormEvent } from "react";
import styles from "./list-page.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { ElementStates } from "../../types/element-states";
import { delay } from "../../utils/utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { LinkedList } from "./utils";
import { HEAD, TAIL } from "../../constants/element-captions";
import { CHANGING, DEFAULT } from "../../constants/element-colors";

type TListItem = {
  value: string;
  color: ElementStates;
  arrow?: boolean;
  topCircle?: boolean;
  bottomCircle?: boolean;
  smallCircle?: {
    value: string;
    color: ElementStates;
  };
};

export const ListPage: React.FC = () => {
  const [value, setValue] = useState<string>("");
  const [index, setIndex] = useState<number | null>(null);
  const [loadAddHead, setLoadAddHead] = useState<boolean>(false);
  const [loadAddTail, setLoadAddTail] = useState<boolean>(false);
  const [loadDeleteHead, setLoadDeleteHead] = useState<boolean>(false);
  const [loadDeleteTail, setLoadDeleteTail] = useState<boolean>(false);
  const [loadAddByIndex, setLoadAddByIndex] = useState<boolean>(false);
  const [loadDeleteByIndex, setLoadDeleteByIndex] = useState<boolean>(false);
  const defaultList = [
    { value: "11", color: ElementStates.Default },
    { value: "26", color: ElementStates.Default },
    { value: "23", color: ElementStates.Default },
    { value: "8", color: ElementStates.Default },
  ];
  const [list, setList] = useState<TListItem[]>(defaultList);

  const linkedList = React.useMemo(() => {
    return new LinkedList<string>(["11", "26", "23", "8"]);
  }, []);

  const onSubmit = (
    e: FormEvent<HTMLFormElement> | FormEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
  };

  const onValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onIndexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIndex(Number(e.target.value));
  };

  const addToHead = async () => {
    setLoadAddHead(true);
    linkedList.prepend(value);
    if (list.length !== 0) {
      list[0] = {
        ...list[0],
        topCircle: true,
        smallCircle: { value: value, color: ElementStates.Changing },
      };
      setList([...list]);
      await delay(SHORT_DELAY_IN_MS);
      list[0] = { ...list[0], topCircle: false };
    }
    list.unshift({
      value: value,
      color: ElementStates.Modified,
    });
    setList([...list]);
    await delay(SHORT_DELAY_IN_MS);
    list[0] = { ...list[0], color: ElementStates.Default };
    setList([...list]);
    await delay(SHORT_DELAY_IN_MS);
    setValue("");
    setLoadAddHead(false);
  };

  const addToTail = async () => {
    setLoadAddTail(true);
    linkedList.append(value);
    if (list.length !== 0) {
      list[list.length - 1] = {
        ...list[list.length - 1],
        topCircle: true,
        smallCircle: { value: value, color: ElementStates.Changing },
      };
      setList([...list]);
      await delay(SHORT_DELAY_IN_MS);
      list[list.length - 1] = { ...list[list.length - 1], topCircle: false };
    }
    list.push({
      value: value,
      color: ElementStates.Modified,
    });
    setList([...list]);
    await delay(SHORT_DELAY_IN_MS);
    list[list.length - 1] = {
      ...list[list.length - 1],
      color: ElementStates.Default,
    };
    setList([...list]);
    await delay(SHORT_DELAY_IN_MS);
    setValue("");
    setLoadAddTail(false);
  };

  const deleteFromHead = async () => {
    setLoadDeleteHead(true);
    linkedList.deleteHead();
    const delEl = list[0].value;
    list[0] = {
      ...list[0],
      value: "",
      bottomCircle: true,
      smallCircle: { value: delEl, color: ElementStates.Changing },
    };
    setList([...list]);
    await delay(SHORT_DELAY_IN_MS);
    list[0] = { ...list[0], bottomCircle: false };
    list.shift();
    setList([...list]);
    await delay(SHORT_DELAY_IN_MS);
    setLoadDeleteHead(false);
  };
  const deleteFromTail = async () => {
    setLoadDeleteTail(true);
    linkedList.deleteTail();
    const delEl = list[list.length - 1].value;
    list[list.length - 1] = {
      ...list[list.length - 1],
      value: "",
      bottomCircle: true,
      smallCircle: { value: delEl, color: ElementStates.Changing },
    };
    setList([...list]);
    await delay(SHORT_DELAY_IN_MS);
    list[list.length - 1] = { ...list[list.length - 1], bottomCircle: false };
    list.pop();
    setList([...list]);
    await delay(SHORT_DELAY_IN_MS);
    setLoadDeleteTail(false);
  };
  const addByIndex = async () => {
    setLoadAddByIndex(true);
    if (index) {
      linkedList.addByIndex(value, index);
      list[0] = {
        ...list[0],
        topCircle: true,
        smallCircle: { value: value, color: ElementStates.Changing },
      };
      setList([...list]);
      await delay(SHORT_DELAY_IN_MS);
      for (let i = 1; i <= index; i++) {
        list[i] = {
          ...list[i],
          topCircle: true,
          smallCircle: { value: value, color: ElementStates.Changing },
        };
        list[i - 1] = {
          ...list[i - 1],
          color: ElementStates.Changing,
          arrow: true,
          topCircle: false,
        };
        setList([...list]);
        await delay(SHORT_DELAY_IN_MS);
      }
      list[index] = { ...list[index], topCircle: false };
      list.splice(index, 0, { value: value, color: ElementStates.Modified });
      setList([...list]);
      await delay(SHORT_DELAY_IN_MS);
      list.map((item) => {
        return (item.color = ElementStates.Default), (item.arrow = false);
      });
      setList([...list]);
      await delay(SHORT_DELAY_IN_MS);
      setIndex(null);
      setValue("");
    }
    setLoadAddByIndex(false);
  };
  const deleteByIndex = async () => {
    setLoadDeleteByIndex(true);
    if (index) {
      linkedList.deleteByIndex(index);
      for (let i = 0; i < index; i++) {
        list[i] = { ...list[i], color: ElementStates.Changing, arrow: true };
        setList([...list]);
        await delay(SHORT_DELAY_IN_MS);
      }
      const deleteItem = list[index].value;
      list[index] = {
        ...list[index],
        value: "",
        color: ElementStates.Changing,
        arrow: false,
        bottomCircle: true,
        smallCircle: { value: deleteItem, color: ElementStates.Changing },
      };
      setList([...list]);
      await delay(SHORT_DELAY_IN_MS);
      list.splice(index, 1);
      list.map((item) => {
        return (item.color = ElementStates.Default), (item.arrow = false);
      });
      setList([...list]);
      await delay(SHORT_DELAY_IN_MS);
      setIndex(null);
    }
    setLoadDeleteByIndex(false);
  };

  return (
    <SolutionLayout title="Связный список">
      <section className={`${styles.content}`}>
        <form className={`${styles.task}`} onSubmit={onSubmit}>
          <Input
            data-testid="value"
            value={value}
            extraClass={`${styles.input}`}
            isLimitText
            type="text"
            maxLength={4}
            onChange={onValueChange}
            required
          />
          <Button
            data-testid="addHead"
            text="Добавить в head"
            type="button"
            linkedList="small"
            disabled={
              !(value.length > 0) || loadAddByIndex || loadDeleteByIndex
            }
            onClick={addToHead}
            isLoader={loadAddHead}
          />
          <Button
            data-testid="addTail"
            text="Добавить в tail"
            type="button"
            linkedList="small"
            disabled={
              !(value.length > 0) || loadAddByIndex || loadDeleteByIndex
            }
            onClick={addToTail}
            isLoader={loadAddTail}
          />
          <Button
            data-testid="delHead"
            text="Удалить из head"
            type="button"
            linkedList="small"
            disabled={list.length === 0 || loadAddByIndex || loadDeleteByIndex}
            onClick={deleteFromHead}
            isLoader={loadDeleteHead}
          />
          <Button
            data-testid="delTail"
            text="Удалить из tail"
            type="button"
            linkedList="small"
            disabled={list.length === 0 || loadAddByIndex || loadDeleteByIndex}
            onClick={deleteFromTail}
            isLoader={loadDeleteTail}
          />
        </form>
        <form className={`${styles.task}`} onSubmit={onSubmit}>
          <Input
            data-testid="index"
            value={index ? `${index}` : ""}
            extraClass={`${styles.input}`}
            type="number"
            onChange={onIndexChange}
            required
          />
          <Button
            data-testid="addByIndex"
            text="Добавить по индексу"
            type="button"
            linkedList="big"
            disabled={
              index === null ||
              value.length === 0 ||
              index > list.length - 1 ||
              loadDeleteByIndex
            }
            onClick={addByIndex}
            isLoader={loadAddByIndex}
          />
          <Button
            data-testid="delByIndex"
            text="Удалить по индексу"
            type="button"
            linkedList="big"
            disabled={
              index === null || index > list.length - 1 || loadAddByIndex
            }
            onClick={deleteByIndex}
            isLoader={loadDeleteByIndex}
          />
        </form>
        <div data-testid="list" className={`${styles.decision}`}>
          {list.map((item, index) => {
            return (
              <div className={`${styles.item}`} key={index}>
                <div className={`${styles.circle}`}>
                  {item.topCircle && (
                    <Circle
                      letter={item.smallCircle?.value}
                      state={item.smallCircle?.color}
                      isSmall={true}
                      extraClass={`${styles.topCircle}`}
                    />
                  )}
                  <Circle
                    letter={item.value}
                    state={item.color}
                    index={index}
                    head={index === 0 && !item.topCircle ? HEAD : ""}
                    tail={
                      index === list.length - 1 && !item.bottomCircle
                        ? TAIL
                        : ""
                    }
                  />
                  {item.bottomCircle && (
                    <Circle
                      letter={item.smallCircle?.value}
                      state={item.smallCircle?.color}
                      isSmall={true}
                      extraClass={`${styles.bottomCircle}`}
                    />
                  )}
                </div>
                {list.length - 1 !== index && (
                  <ArrowIcon fill={item.arrow ? CHANGING : DEFAULT} />
                )}
              </div>
            );
          })}
        </div>
      </section>
    </SolutionLayout>
  );
};
