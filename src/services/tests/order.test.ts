import orderReducer, { clearOrder, IOrderState } from "../store/order";

const initialState: IOrderState = {
    order: null,
    orderRequest: false,
    orderFailed: false
}

describe("order slice", () => {
    test("should return inital state", () => {
        expect(orderReducer(undefined, { type: "" })).toEqual(initialState);
    })

    test("should clear order slice", () => {
        const localInitialState = {
            order: { number: 1111 },
            orderRequest: true,
            orderFailed: true
        }
        const action = clearOrder();
        const result = orderReducer(localInitialState, action);

        expect(result).toEqual(initialState);
    })
})