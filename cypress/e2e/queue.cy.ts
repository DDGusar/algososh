import {
  BORDER_BLUE,
  BORDER_PINK,
  CIRCLE,
  HEAD,
  TAIL,
  VALUE,
} from "../../src/constants/test";

describe("Проверка работы Очереди:", () => {
  const testArr = [2, 3, 4, 3, 6];
  beforeEach(() => {
    cy.visit("queue");
    cy.get(VALUE).as("value");
    cy.get('[data-testid="add"]').as("add");
    cy.get('[data-testid="delete"]').as("delete");
    cy.get('[data-testid="clear"]').as("clear");
  });
  it("Кнопка добавления заблокирована при пустом инпуте", () => {
    cy.get("@value").should("have.value", "");
    cy.get("@add").should("be.disabled");
  });
  it("Добавление в очередь происходит верно", () => {
    for (let i = 0; i < 7; i++) {
      cy.get("@value").type(i);
      cy.get("@add").should("be.not.disabled").click();
      cy.get(CIRCLE).as("circles");
      cy.get(HEAD).as("heads");
      cy.get("@heads").eq(0).should("have.text", "head");
      cy.get("@circles").should(async ($circle) => {
        expect($circle[i]).to.contain(i);
        expect($circle[i]).to.have.css("border", BORDER_PINK);
        await new Promise((resolve) => setTimeout(resolve, 500));
        expect($circle[i]).to.have.css("border", BORDER_BLUE);
      });
      cy.get(TAIL).as("tails");
      cy.get("@tails").eq(i).should("have.text", "tail");
    }
  });
  it("Удаление из очереди происходит верно", () => {
    for (let i = 0; i < 7; i++) {
      cy.get("@value").type(i);
      cy.get("@add").should("be.not.disabled").click();
    }
    cy.get("@delete").should("be.not.disabled").click();
    cy.get(HEAD).as("heads");
    cy.get(CIRCLE).as("circles");
    cy.get("@circles").should(async ($circle) => {
      expect($circle[0]).to.have.css("border", BORDER_PINK);
      await new Promise((resolve) => setTimeout(resolve, 500));
      expect($circle[0]).to.have.text("");
    });
    cy.get("@heads").eq(0).should("have.text", "");
    cy.get("@heads").eq(1).should("have.text", "head");
  });
  it("Очистка очереди происходит верно", () => {
    for (let i = 0; i < 7; i++) {
      cy.get("@value").type(i);
      cy.get("@add").should("be.not.disabled").click();
    }
    cy.get("@clear").should("be.not.disabled").click();
    cy.get(HEAD).as("heads");
    cy.get("@heads").should("have.text", "");
    cy.get(CIRCLE).as("circles");
    cy.get("@circles").should("have.text", "");
    cy.get(TAIL).as("tails");
    cy.get("@tails").should("have.text", "");
  });
});
