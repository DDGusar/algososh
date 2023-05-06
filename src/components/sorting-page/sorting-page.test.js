import { waitFor } from "@testing-library/react";
import { ElementStates } from "../../types/element-states";
import { bubbleSort, selectionSort } from "./utils";

const setRandomArray = jest.fn;
const setLoader = jest.fn;

const emptyArray = [];

const testArrOneElement = [{ value: 1, color: ElementStates.Default }];

const testArrSomeElements = [
  { value: 11, color: ElementStates.Default },
  { value: 26, color: ElementStates.Default },
  { value: 23, color: ElementStates.Default },
  { value: 8, color: ElementStates.Default },
];

const testArrAscending = [
  { value: 8, color: ElementStates.Modified },
  { value: 11, color: ElementStates.Modified },
  { value: 23, color: ElementStates.Modified },
  { value: 26, color: ElementStates.Modified },
];

const testArrDescending = [
  { value: 26, color: ElementStates.Modified },
  { value: 23, color: ElementStates.Modified },
  { value: 11, color: ElementStates.Modified },
  { value: 8, color: ElementStates.Modified },
];

describe("Корректно сортирует: ", () => {
  it("пустой массив выбором", async () => {
    await selectionSort("ascending", emptyArray, setRandomArray, setLoader);
    expect(emptyArray).toStrictEqual([]);
  });

  it("массив из одного элемента выбором по возрастанию", async () => {
    await selectionSort(
      "ascending",
      testArrOneElement,
      setRandomArray,
      setLoader
    );
    expect(testArrOneElement).toStrictEqual(testArrOneElement);
  });
  it("массив из одного элемента выбором по по убыванию", async () => {
    await selectionSort(
      "descending",
      testArrOneElement,
      setRandomArray,
      setLoader
    );
    expect(testArrOneElement).toStrictEqual(testArrOneElement);
  });

  it("массив из нескольких элементов выбором по возрастанию", () => {
    waitFor(
      () => {
        selectionSort(
          "ascending",
          testArrSomeElements,
          setRandomArray,
          setLoader
        );
        expect(testArrSomeElements).toStrictEqual(testArrAscending);
      },
      { timeout: 1000 }
    );
  });
  it("массив из нескольких элементов выбором по убыванию", () => {
    waitFor(
      () => {
        selectionSort(
          "descending",
          testArrSomeElements,
          setRandomArray,
          setLoader
        );
        expect(testArrSomeElements).toStrictEqual(testArrDescending);
      },
      { timeout: 1000 }
    );
  });

  it("пустой массив пузырьком", async () => {
    await bubbleSort("ascending", emptyArray, setRandomArray, setLoader);
    expect(emptyArray).toStrictEqual([]);
  });

  it("массив из одного элемента пузырьком по возрастанию", async () => {
    await bubbleSort("ascending", testArrOneElement, setRandomArray, setLoader);
    expect(testArrOneElement).toStrictEqual(testArrOneElement);
  });

  it("массив из одного элемента пузырьком по по убыванию", async () => {
    await bubbleSort(
      "descending",
      testArrOneElement,
      setRandomArray,
      setLoader
    );
    expect(testArrOneElement).toStrictEqual(testArrOneElement);
  });

  it("массив из нескольких элементов пузырьком по возрастанию", () => {
    waitFor(
      () => {
        bubbleSort("ascending", testArrSomeElements, setRandomArray, setLoader);
        expect(testArrSomeElements).toStrictEqual(testArrAscending);
      },
      { timeout: 1000 }
    );
  });
  it("массив из нескольких элементов пузырьком по убыванию", () => {
    waitFor(
      () => {
        bubbleSort(
          "descending",
          testArrSomeElements,
          setRandomArray,
          setLoader
        );
        expect(testArrSomeElements).toStrictEqual(testArrDescending);
      },
      { timeout: 1000 }
    );
  });
});
