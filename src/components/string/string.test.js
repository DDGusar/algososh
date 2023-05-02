import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { StringComponent } from "./string";

describe("Корректно разворачивает строку: ", () => {
  it("с чётным количеством символов", () => {
    render(
      <BrowserRouter>
        <StringComponent />
      </BrowserRouter>
    );

    const string = screen.getByTestId("value");
    const button = screen.getByTestId("button");

    const testStr = "qwerty";

    const reverseTestStr = Array(testStr).reverse().join("");

    userEvent.type(string, testStr);

    expect(string).toHaveValue(testStr);

    fireEvent.click(button);

    waitFor(
      () => {
        const circles = screen.getAllByTestId("circle");

        const res = circles.map((item) => item.textContent).join("");

        expect(res).toBe(reverseTestStr);
      },
      { timeout: 1000 }
    );
  });
  it("с нечетным количеством символов", () => {
    render(
      <BrowserRouter>
        <StringComponent />
      </BrowserRouter>
    );

    const string = screen.getByTestId("value");
    const button = screen.getByTestId("button");

    const testStr = "qwertyuw";

    const reverseTestStr = Array(testStr).reverse().join("");

    userEvent.type(string, testStr);

    expect(string).toHaveValue(testStr);

    fireEvent.click(button);

    waitFor(
      () => {
        const circles = screen.getAllByTestId("circle");

        const res = circles.map((item) => item.textContent).join("");

        expect(res).toBe(reverseTestStr);
      },
      { timeout: 1000 }
    );
  });
  it("с одним символом", () => {
    render(
      <BrowserRouter>
        <StringComponent />
      </BrowserRouter>
    );

    const string = screen.getByTestId("value");
    const button = screen.getByTestId("button");

    const testStr = "q";

    const reverseTestStr = Array(testStr).reverse().join("");

    userEvent.type(string, testStr);

    expect(string).toHaveValue(testStr);

    fireEvent.click(button);

    waitFor(
      () => {
        const circles = screen.getAllByTestId("circle");

        const res = circles.map((item) => item.textContent).join("");

        expect(res).toBe(reverseTestStr);
      },
      { timeout: 1000 }
    );
  });
  it("с пустой строкой", () => {
    render(
      <BrowserRouter>
        <StringComponent />
      </BrowserRouter>
    );

    const string = screen.getByTestId("value");
    const button = screen.getByTestId("button");

    expect(string).toHaveValue("");

    expect(button).toBeDisabled();
  });
});
