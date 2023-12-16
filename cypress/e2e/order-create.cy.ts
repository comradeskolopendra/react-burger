import { getStringIdByName } from "../../src/helpers/helpers";

import { BASE_URL } from "../../src/utils/constants";

describe("create order and test modal", () => {
    beforeEach(() => {
        cy.visit("/")

        cy.intercept("POST", `${BASE_URL}/orders`, { fixture: "order.json" });
        cy.intercept("GET", `${BASE_URL}/auth/user`, { fixture: "user.json" }).as("user");

        window.localStorage.setItem("accessToken", JSON.stringify("accessToken"))
        window.localStorage.setItem("refreshToken", JSON.stringify("refreshToken"))

        cy.get(getStringIdByName("ingredients")).contains("Соус фирменный Space Sauce").as("ingredient");
        cy.get(getStringIdByName("ingredients")).contains("Краторная булка N-200i").as("bun")
        cy.get(getStringIdByName("ingredient-place")).as("ingredient-place");
        cy.get(getStringIdByName("bun-place")).first().as("bun-place")

        cy.get(getStringIdByName("order")).as("order");
    })

    afterEach(() => {
        cy.clearLocalStorage();
    })

    it("should create order", () => {
        cy.get("@ingredient").trigger("dragstart");
        cy.get("@ingredient-place").trigger("drop");

        cy.get("@bun").trigger("dragstart");
        cy.get("@bun-place").trigger("drop");

        cy.wait("@user");

        cy.get("@order").click();

        cy.contains("идентификатор заказа").should("exist");
    });

    it("should relocate to login when not log", () => {
        cy.visit("/");
        window.localStorage.removeItem("accessToken");
        window.localStorage.removeItem("refreshToken");

        cy.get("@ingredient").trigger("dragstart");
        cy.get("@ingredient-place").trigger("drop");

        cy.get("@bun").trigger("dragstart");
        cy.get("@bun-place").trigger("drop");

        cy.get("@order").click();
        cy.contains("Вход").should("exist");
    })

    it("should close modal by click close-button", () => {
        cy.get("@ingredient").trigger("dragstart");
        cy.get("@ingredient-place").trigger("drop");

        cy.get("@bun").trigger("dragstart");
        cy.get("@bun-place").trigger("drop");

        cy.wait("@user");

        cy.get("@order").click();

        cy.get(getStringIdByName("order-modal-close")).click();

        cy.contains("идентификатор заказа").should("not.exist");
    })

    it("should close modal by click bg", () => {
        cy.get("@ingredient").trigger("dragstart");
        cy.get("@ingredient-place").trigger("drop");

        cy.get("@bun").trigger("dragstart");
        cy.get("@bun-place").trigger("drop");

        cy.wait("@user");

        cy.get("@order").click();

        cy.get(getStringIdByName("overlay")).click(15, 15, { force: true });

        cy.contains("идентификатор заказа").should("not.exist");
    })

    it("should close modal by press esc", () => {
        cy.get("@ingredient").trigger("dragstart");
        cy.get("@ingredient-place").trigger("drop");

        cy.get("@bun").trigger("dragstart");
        cy.get("@bun-place").trigger("drop");

        cy.wait("@user");

        cy.get("@order").click();

        cy.get("body").type("{esc}")

        cy.contains("идентификатор заказа").should("not.exist");
    })
})