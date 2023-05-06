describe("Доступные страницы:", () => {
  it("Строка", function () {
    cy.viewport(1440, 900);
    cy.visit("recursion");
    cy.wait(1000);
  });
  it("Последовательность Фибоначчи", function () {
    cy.viewport(1440, 900);
    cy.visit("fibonacci");
    cy.wait(1000);
  });
  it("Сортировка массива", function () {
    cy.viewport(1440, 900);
    cy.visit("sorting");
    cy.wait(1000);
  });
  it("Стек", function () {
    cy.viewport(1440, 900);
    cy.visit("stack");
    cy.wait(1000);
  });
  it("Очередь", function () {
    cy.viewport(1440, 900);
    cy.visit("queue");
    cy.wait(1000);
  });
  it("Связный список", function () {
    cy.viewport(1440, 900);
    cy.visit("list");
    cy.wait(1000);
  });
});
