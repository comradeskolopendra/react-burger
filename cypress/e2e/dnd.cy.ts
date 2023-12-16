import { getStringIdByName } from "../../src/helpers/helpers"

describe("dnd", () => {
    beforeEach(() => {
        cy.visit("/")

        cy.get(getStringIdByName("ingredients")).contains("Мини-салат Экзо-Плантаго").as("ingredient");
        cy.get(getStringIdByName("ingredients")).contains("Соус Spicy-X").as("second-ingredient")
        cy.get(getStringIdByName("ingredients")).contains("Краторная булка N-200i").as("bun")
        cy.get(getStringIdByName("ingredient-place")).as("ingredient-place");
        cy.get(getStringIdByName("bun-place")).first().as("bun-place")

        cy.get(getStringIdByName("order")).as("order");
    });

    it("should add bun to constructor", () => {
        cy.get("@bun").trigger("dragstart");
        cy.get("@bun-place").trigger("drop");

        cy.contains("Попробуйте перетащить булку!").should("not.exist")
    })

    it("should add ingredient to constructor", () => {
        cy.get("@ingredient").trigger("dragstart");
        cy.get("@ingredient-place").trigger("drop");

        cy.contains("Попробуйте перетащить ингредиент!").should("not.exist")
    })

    it("should delete ingredient", () => {
        cy.get("@ingredient").trigger("dragstart");
        cy.get("@ingredient-place").trigger("drop");

        cy.get(`${getStringIdByName("constructor-ingredient")} .constructor-element__action`).click();
        cy.get(getStringIdByName("ingredient-place")).contains("Соус фирменный Space Sauce").should("not.exist");
    })

    // it("should move ingredients", () => {
    //     cy.get("@second-ingredient").trigger("dragstart");
    //     cy.get("@ingredient-place").trigger("drop");

    //     cy.get("@ingredient").trigger("dragstart");
    //     cy.get("@ingredient-place").trigger("drop");

    //     cy.get(getStringIdByName("constructor-ingredient")).contains("Мини-салат Экзо-Плантаго").trigger("dragstart");
    //     cy.get("@ingredient-place").trigger("drop", 15, 15);
    // })
})