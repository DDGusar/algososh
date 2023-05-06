import {
  VALUE,
  INDEX,
  ADD_HEAD,
  DEL_HEAD,
  ADD_TAIL,
  DEL_TAIL,
  ADD_BY_INDEX,
  DEL_BY_INDEX,
  CIRCLE,
  HEAD,
  TAIL,
  BORDER_BLUE,
} from "../../src/constants/test";

describe("Проверка работы связного списка:", () => {
  const defaultList = [11, 26, 23, 8];
  beforeEach(() => {
    cy.visit("list");
    cy.get(VALUE).as("value");
    cy.get(INDEX).as("index");
    cy.get(ADD_HEAD).as("addHead");
    cy.get(DEL_HEAD).as("delHead");
    cy.get(ADD_TAIL).as("addTail");
    cy.get(DEL_TAIL).as("delTail");
    cy.get(ADD_BY_INDEX).as("addByIndex");
    cy.get(DEL_BY_INDEX).as("delByIndex");
  });
  it("Кнопки добавления, добавления и удаления по индексу при пустом инпуте заблокированы", () => {
    cy.get("@value").should("have.value", "");
    cy.get("@addHead").should("be.disabled");
    cy.get("@addTail").should("be.disabled");
    cy.get("@addByIndex").should("be.disabled");
    cy.get("@delByIndex").should("be.disabled");
  });
  it("Отрисовка списка при старте страницы", () => {
    cy.get(CIRCLE).as("circles");
    cy.get("@circles").should("have.length", defaultList.length);
    cy.get(HEAD).as("heads");
    cy.get("@heads").eq(0).should("have.text", "head");
    for (let i = 0; i < defaultList.length; i++) {
      cy.get("@circles").should(($circle) => {
        expect($circle[i]).to.contain(defaultList[i]);
        expect($circle[i]).to.have.css("border", BORDER_BLUE);
      });
    }
    cy.get(TAIL).as("tails");
    cy.get("@tails").eq(3).should("have.text", "tail");
  });
  it("Добавление элемента в head", () => {
    cy.get("@value").type(4);
    cy.get("@addHead").should("be.not.disabled").click();
    cy.get(CIRCLE).as("circles");
    cy.get("@circles").eq(0).should("have.text", "4");
    cy.wait(1000);
    cy.get("@circles").should("have.length", defaultList.length + 1);
    cy.get(HEAD).as("heads");
    cy.get("@heads").eq(0).should("have.text", "head");
    cy.get("@circles").eq(0).should("have.text", "4");
  });
  it("Добавление элемента в tail", () => {
    cy.get("@value").type(5);
    cy.get("@addTail").should("be.not.disabled").click();
    cy.get(CIRCLE).as("circles");
    cy.get("@circles")
      .eq(defaultList.length - 1)
      .should("have.text", "5");
    cy.wait(1000);
    cy.get("@circles").should("have.length", defaultList.length + 1);
    cy.get("@circles").eq(4).should("have.text", "5");
    cy.get(TAIL).as("tails");
    cy.get("@tails").eq(4).should("have.text", "tail");
  });
  it("Добавление элемента по индексу", () => {
    const index = 3;
    cy.get("@value").type(5);
    cy.get("@index").type(String(index));
    cy.get("@addByIndex").should("be.not.disabled").click();
    cy.get(CIRCLE).as("circles");
    cy.wait(1000);
    cy.get("@circles")
      .eq(defaultList.length - 1)
      .should("have.text", "5");
    cy.wait(1000);
    cy.get("@circles").should("have.length", defaultList.length + 1);
    cy.get("@circles").eq(index).should("have.text", "5");
  });
  it("Удаление элемента из head", () => {
    cy.get("@delHead").should("be.not.disabled").click();
    cy.get(CIRCLE).as("circles");
    cy.get("@circles").eq(0).should("have.text", "");
    cy.get("@circles").eq(1).should("have.text", "23");
    cy.wait(1000);
    cy.get("@circles").should("have.length", defaultList.length - 1);
  });
  it("Удаление элемента из tail", () => {
    cy.get("@delTail").should("be.not.disabled").click();
    cy.get(CIRCLE).as("circles");
    cy.get("@circles")
      .eq(defaultList.length - 1)
      .should("have.text", "");
    cy.get("@circles").eq(defaultList.length).should("have.text", "8");
    cy.wait(1000);
    cy.get("@circles").should("have.length", defaultList.length - 1);
  });
  it("Удаление элемента по индексу", () => {
    const index = 2;
    cy.get("@index").type(index);
    cy.get("@delByIndex").should("be.not.disabled").click();
    cy.get(CIRCLE).as("circles");
    cy.wait(1000);
    cy.get("@circles").eq(2).should("have.text", "");
    cy.get("@circles")
      .eq(defaultList.length - 2)
      .should("have.text", "8");
    cy.wait(1000);
    cy.get("@circles").should("have.length", defaultList.length - 1);
  });
});
