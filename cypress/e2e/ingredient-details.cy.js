describe("modals", () => {
    beforeEach(() => {
        cy.visit("/");
    })

    it("should open modal", () => {
        cy.get("a").contains("Краторная булка N-200i").click();
        cy.get("[data-testid=modal]").contains("Детали ингредиента").should("exist")
    });

    it("should close modal by click close button", () => {
        cy.get("a").contains("Краторная булка N-200i").click();

        cy.get("[data-testid=closeButton]").click();
        cy.contains("Детали ингредиента").should("not.exist")
    });

    it("should close modal by click bg", () => {
        cy.get("a").contains("Краторная булка N-200i").click();

        cy.get("[data-testid=overlay]").click({ force: true });
        cy.contains("Детали ингредиента").should("not.exist")
    });

    it("should close modal by press esc", () => {
        cy.get("a").contains("Краторная булка N-200i").click();

        cy.get("body").type("{esc}");
        cy.contains("Детали ингредиента").should("not.exist")
    })
})