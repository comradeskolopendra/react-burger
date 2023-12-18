import modalReducer, { setVisibleOrder, IModalState } from "../store/modal";

const initialState: IModalState = {
    visibleOrder: false,
}

describe("modal slice", () => {
    test("should return initial state", () => {
        expect(modalReducer(undefined, { type: "" })).toEqual(initialState)
    });

    test("should return initail state when passed an empty action", () => {
        const result = modalReducer(undefined, { type: "" });
        expect(result).toEqual(initialState)
    })

    test("should open modal with 'setVisibleOrder' action", () => {
        const action = setVisibleOrder(true);

        const result = modalReducer(undefined, action);
        expect(result.visibleOrder).toBe(true);
    })
})