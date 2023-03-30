describe("Navigation", () => {
  it("should visit root", () => {
    cy.visit("/");
  });
  it("shuld navigate to Tuesday", () => {
    cy.visit("/")
    cy.contains("[data-testid=day]", "Tuesday")
    .click()
    .should("have.class", "day-list__item--selected")
  })
});