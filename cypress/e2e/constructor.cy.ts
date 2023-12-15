import { getStringIdByName } from "../../src/helpers/helpers"

import { BASE_URL } from "../../src/utils/constants"

describe("dnd and order", () => {
    beforeEach(() => {
        cy.visit("/")
    });

    afterEach(() => {
        cy.clearLocalStorage();
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

    it("should relocate to login when not log", () => {
        cy.get(getStringIdByName("ingredients")).contains("Соус фирменный Space Sauce").trigger("dragstart");
        cy.get(getStringIdByName("ingredient-place")).trigger("drop");

        cy.get(getStringIdByName("ingredients")).contains("Краторная булка N-200i").trigger("dragstart");
        cy.get(getStringIdByName("bun-place")).first().trigger("drop");

        cy.get(getStringIdByName("order")).click();
        cy.contains("Вход").should("exist");
    })

    it("should create order", () => {
        cy.intercept("POST", `${BASE_URL}/orders`, { fixture: "order.json" }).as("order");
        cy.intercept("GET", `${BASE_URL}/auth/user`, { fixture: "user.json" }).as("user");

        window.localStorage.setItem("accessToken", JSON.stringify("accessToken"))
        window.localStorage.setItem("refreshToken", JSON.stringify("refreshToken"))

        cy.get(getStringIdByName("ingredients")).contains("Соус фирменный Space Sauce").trigger("dragstart");
        cy.get(getStringIdByName("ingredient-place")).trigger("drop");

        cy.get(getStringIdByName("ingredients")).contains("Краторная булка N-200i").trigger("dragstart");
        cy.get(getStringIdByName("bun-place")).first().trigger("drop");

        cy.wait("@user");

        cy.get(getStringIdByName("order")).click();

        cy.contains("идентификатор заказа").should("exist");
    });

    it("should close modal by click close-button", () => {
        cy.intercept("POST", `${BASE_URL}/orders`, { fixture: "order.json" }).as("order");
        cy.intercept("GET", `${BASE_URL}/auth/user`, { fixture: "user.json" }).as("user");

        window.localStorage.setItem("accessToken", JSON.stringify("accessToken"))
        window.localStorage.setItem("refreshToken", JSON.stringify("refreshToken"))

        cy.get(getStringIdByName("ingredients")).contains("Соус фирменный Space Sauce").trigger("dragstart");
        cy.get(getStringIdByName("ingredient-place")).trigger("drop");

        cy.get(getStringIdByName("ingredients")).contains("Краторная булка N-200i").trigger("dragstart");
        cy.get(getStringIdByName("bun-place")).first().trigger("drop");

        cy.wait("@user");

        cy.get(getStringIdByName("order")).click();

        cy.get(getStringIdByName("order-modal-close")).click();

        cy.contains("идентификатор заказа").should("not.exist");
    })

    it("should close modal by click bg", () => {
        cy.intercept("POST", `${BASE_URL}/orders`, { fixture: "order.json" }).as("order");
        cy.intercept("GET", `${BASE_URL}/auth/user`, { fixture: "user.json" }).as("user");

        window.localStorage.setItem("accessToken", JSON.stringify("accessToken"))
        window.localStorage.setItem("refreshToken", JSON.stringify("refreshToken"))

        cy.get(getStringIdByName("ingredients")).contains("Соус фирменный Space Sauce").trigger("dragstart");
        cy.get(getStringIdByName("ingredient-place")).trigger("drop");

        cy.get(getStringIdByName("ingredients")).contains("Краторная булка N-200i").trigger("dragstart");
        cy.get(getStringIdByName("bun-place")).first().trigger("drop");

        cy.wait("@user");

        cy.get(getStringIdByName("order")).click();

        cy.get(getStringIdByName("overlay")).click(15, 15, { force: true });

        cy.contains("идентификатор заказа").should("not.exist");
    })

    it("should close modal by press esc", () => {
        cy.intercept("POST", `${BASE_URL}/orders`, { fixture: "order.json" }).as("order");
        cy.intercept("GET", `${BASE_URL}/auth/user`, { fixture: "user.json" }).as("user");

        window.localStorage.setItem("accessToken", JSON.stringify("accessToken"))
        window.localStorage.setItem("refreshToken", JSON.stringify("refreshToken"))

        cy.get(getStringIdByName("ingredients")).contains("Соус фирменный Space Sauce").trigger("dragstart");
        cy.get(getStringIdByName("ingredient-place")).trigger("drop");

        cy.get(getStringIdByName("ingredients")).contains("Краторная булка N-200i").trigger("dragstart");
        cy.get(getStringIdByName("bun-place")).first().trigger("drop");

        cy.wait("@user");

        cy.get(getStringIdByName("order")).click();

        cy.get("body").type("{esc}")

        cy.contains("идентификатор заказа").should("not.exist");
    })
})