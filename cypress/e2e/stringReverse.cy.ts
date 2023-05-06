import {
  BORDER_BLUE,
  BORDER_GREEN,
  BORDER_PINK,
  BUTTON,
  CIRCLE,
  VALUE,
} from "../../src/constants/test";

describe("Страница разворот строки", () => {
  beforeEach(() => {
    cy.visit("recursion");
    cy.get(VALUE).should("have.value", "").as("string");
    cy.get(BUTTON).as("button");
  });

  it("Кнопка заблокирована при пустом инпуте", () => {
    cy.get("@button").should("be.disabled");
  });
  it("Строка разворачивается корректно", () => {
    const testString = "table";
    cy.get("@string").type(testString);
    cy.get("@button").should("be.not.disabled").click();

    cy.get(CIRCLE).as("circles");
    cy.get("@circles").should(async ($circle) => {
      expect($circle).to.have.length(testString.length);
      for (let i = 0; i < testString.length; i++) {
        expect($circle[i]).to.have.text(testString[i]);
        expect($circle[i]).to.have.css("border", BORDER_BLUE);
      }
      await new Promise((resolve) => setTimeout(resolve, 1000));
      expect($circle[0]).to.have.css("border", BORDER_PINK);
      expect($circle[4]).to.have.css("border", BORDER_PINK);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      expect($circle[0]).to.have.text(testString[4]);
      expect($circle[4]).to.have.text(testString[0]);
      expect($circle[0]).to.have.css("border", BORDER_GREEN);
      expect($circle[4]).to.have.css("border", BORDER_GREEN);

      expect($circle[1]).to.have.css("border", BORDER_PINK);
      expect($circle[3]).to.have.css("border", BORDER_PINK);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      expect($circle[1]).to.have.text(testString[3]);
      expect($circle[3]).to.have.text(testString[1]);
      expect($circle[1]).to.have.css("border", BORDER_GREEN);
      expect($circle[3]).to.have.css("border", BORDER_GREEN);

      await new Promise((resolve) => setTimeout(resolve, 1000));
      expect($circle[2]).to.have.text(testString[2]);
      expect($circle[2]).to.have.text(testString[2]);
      expect($circle[2]).to.have.css("border", BORDER_GREEN);
      expect($circle[2]).to.have.css("border", BORDER_GREEN);
    });
  });
});
