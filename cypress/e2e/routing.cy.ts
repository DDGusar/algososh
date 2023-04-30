describe("Доступные страницы:", () => {
  it("Строка", function () {
    cy.viewport(1440, 900);
    cy.visit("http://localhost:3000/recursion");
    cy.wait(1000);
  });
  it("Последовательность Фибоначчи", function () {
    cy.viewport(1440, 900);
    cy.visit("http://localhost:3000/fibonacci");
    cy.wait(1000);
  });
  it("Сортировка массива", function () {
    cy.viewport(1440, 900);
    cy.visit("http://localhost:3000/sorting");
    cy.wait(1000);
  });
  it("Стек", function () {
    cy.viewport(1440, 900);
    cy.visit("http://localhost:3000/stack");
    cy.wait(1000);
  });
  it("Очередь", function () {
    cy.viewport(1440, 900);
    cy.visit("http://localhost:3000/queue");
    cy.wait(1000);
  });
  it("Связный список", function () {
    cy.viewport(1440, 900);
    cy.visit("http://localhost:3000/list");
    cy.wait(1000);
  });
});
