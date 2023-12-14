import { getStringIdByName } from "../../src/helpers/helpers"

import { BASE_URL } from "../../src/utils/constants"

describe("dnd and order", () => {
    beforeEach(() => {
        cy.visit("/")
    })

    it("should add bun to constructor", () => {
        cy.get(getStringIdByName("ingredients")).contains("Краторная булка N-200i").trigger("dragstart");

        cy.get(getStringIdByName("bun-place")).first().trigger("drop");

        cy.contains("Попробуйте перетащить булку!").should("not.exist")
    })

    it("should add ingredient to constructor", () => {
        cy.get(getStringIdByName("ingredients")).contains("Соус фирменный Space Sauce").trigger("dragstart");

        cy.get(getStringIdByName("ingredient-place")).trigger("drop");

        cy.contains("Попробуйте перетащить ингредиент!").should("not.exist")
    })

    it("should relocate to login", () => {
        cy.get(getStringIdByName("ingredients")).contains("Соус фирменный Space Sauce").trigger("dragstart");
        cy.get(getStringIdByName("ingredient-place")).trigger("drop");

        cy.get(getStringIdByName("ingredients")).contains("Краторная булка N-200i").trigger("dragstart");
        cy.get(getStringIdByName("bun-place")).first().trigger("drop");

        cy.get(getStringIdByName("order")).click();
        cy.contains("Вход").should("exist");
    })

    it("should create order", () => {
        cy.intercept("POST", `/orders`, { fixture: "order.json" });
    });
})