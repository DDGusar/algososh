import { VALUE, BUTTON, CIRCLE } from "../../src/constants/test";
describe("Проверка работы последовательности Фибоначчи:", () => {
  beforeEach(() => {
    cy.visit("fibonacci");
    cy.get(VALUE).as("value");
    cy.get(BUTTON).as("button");
  });
  it("блокировка кнопки при пустом инпуте", () => {
    cy.get("@value").should("have.value", "");
    cy.get("@button").should("be.disabled");
  });
  it("числа генерируются верно", () => {
    const number = 4;
    const result = [1, 1, 2, 3, 5];
    cy.get("@value").type(String(number));
    cy.get("@button").should("be.not.disabled").click();
    cy.wait(500 * result.length);
    cy.get(CIRCLE).as("circles");
    cy.get("@circles").should("have.length", result.length);
    for (let i = 0; i < result.length; i++) {
      cy.get("@circles").should(async ($circle) => {
        expect($circle[i]).to.have.text(result[i]);
      });
    }
  });
});
