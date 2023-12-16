import orderReducer, { clearOrder, IOrderState } from "../store/order";
import { createOrderThunk } from "../actions/order";
import { IOrder } from "../../utils/types";
import { store } from "..";

const initialState: IOrderState = {
    order: null,
    orderRequest: false,
    orderFailed: false
}

const mockOrder: IOrder = {
    number: 1111
}

describe("order slice", () => {
    afterEach(() => {
        jest.restoreAllMocks()
    })

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

    test("should response fulfilled with 'createOrderThunk'", async () => {
        jest.spyOn(global, "fetch").mockResolvedValue({
            ...new Response(),
            ok: true,
            json: () => Promise.resolve({ order: mockOrder })
        })

        const dispatch = jest.fn();
        const thunk = createOrderThunk(["123", "321"]);

        await thunk(dispatch, store.getState, undefined);

        const { calls } = dispatch.mock;
        expect(calls).toHaveLength(3);

        const [pending, clear, fulfilled] = calls;

        expect(pending[0].type).toBe("normaapi/order/pending");
        expect(clear[0].type).toBe("constructor/clearConstructor")
        expect(fulfilled[0].type).toBe("normaapi/order/fulfilled");

        expect(orderReducer(undefined, pending[0]).orderRequest).toBe(true);
        expect(orderReducer(undefined, fulfilled[0]).order).toEqual(mockOrder);
    })

    test("should response rejected with 'createOrderThunk'", async () => {
        jest.spyOn(global, "fetch").mockResolvedValue({
            ...new Response(),
            ok: false,
        })

        const dispatch = jest.fn();
        const thunk = createOrderThunk(["123", "321"]);

        await thunk(dispatch, store.getState, undefined);

        const { calls } = dispatch.mock;
        expect(calls).toHaveLength(2);

        const [pending, rejected] = calls;

        expect(pending[0].type).toBe("normaapi/order/pending");
        expect(rejected[0].type).toBe("normaapi/order/rejected");

        expect(orderReducer(undefined, pending[0]).orderRequest).toBe(true);
        expect(orderReducer(undefined, rejected[0]).orderFailed).toBe(true);
    })
})