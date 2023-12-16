import selectedOrder, { IInitialState } from "../store/selected-order";
import { getOrderByNumber } from "../actions/selected-order";
import { IGetOrderByNumber } from "../types";
import { store } from "..";

const mockData: IGetOrderByNumber = {
    success: true,
    orders: [
        {
            _id: "123",
            ingredients: ["123", "321"],
            owner: "me",
            status: "done",
            name: "random",
            createdAt: "16.12.23",
            updatedAt: "16.12.23",
            number: 1111,
            __v: 321,
        },
    ],
}

const initialState: IInitialState = {
    data: {
        success: false,
        orders: [
            {
                _id: "",
                ingredients: [""],
                owner: "",
                status: "",
                name: "",
                createdAt: "",
                updatedAt: "",
                number: 0,
                __v: 0,
            },
        ],
    },
    reqError: false,
    reqLoading: false,
};

describe("selected order slice", () => {
    afterEach(() => {
        jest.restoreAllMocks()
    })

    test("should return initial state", () => {
        expect(selectedOrder(undefined, { type: "" })).toEqual(initialState);
    })

    test("should response fulfilled with 'getOrderByNumber'", async () => {
        jest.spyOn(global, "fetch").mockResolvedValue({
            ...new Response(),
            ok: true,
            json: () => Promise.resolve(mockData)
        })

        const dispatch = jest.fn();
        const thunk = getOrderByNumber(123);

        await thunk(dispatch, store.getState, undefined);

        const { calls } = dispatch.mock;
        expect(calls).toHaveLength(2);

        const [pending, fulfilled] = calls;

        expect(pending[0].type).toBe("normaapi/order-number/pending");
        expect(fulfilled[0].type).toBe("normaapi/order-number/fulfilled");

        expect(selectedOrder(undefined, pending[0]).reqLoading).toBe(true);
        expect(selectedOrder(undefined, fulfilled[0]).data).toEqual(mockData);
    })

    test("should response reject with 'getOrderByNumber'", async () => {
        jest.spyOn(global, "fetch").mockResolvedValue({
            ...new Response(),
            ok: false,
        })

        const dispatch = jest.fn();
        const thunk = getOrderByNumber(123);

        await thunk(dispatch, store.getState, undefined);

        const { calls } = dispatch.mock;
        expect(calls).toHaveLength(2);

        const [pending, reject] = calls;

        expect(pending[0].type).toBe("normaapi/order-number/pending");
        expect(reject[0].type).toBe("normaapi/order-number/rejected");

        expect(selectedOrder(undefined, pending[0]).reqLoading).toBe(true);
        expect(selectedOrder(undefined, reject[0]).reqError).toBe(true);
    })
})