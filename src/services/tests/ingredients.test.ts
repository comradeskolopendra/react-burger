import ingredientsReducer, { IIngredientsState } from "../store/ingredients";
import { store } from "..";
import { getIngredientsThunk } from "../actions/ingredients";
import { IIngredient } from "../../utils/types";

const initialState: IIngredientsState = {
    ingredientsRequest: false,
    ingredientsFailed: false,
    ingredients: []
}

const mockIngredients: IIngredient[] = [{
    _id: '643d69a5c3f7b9001cfa093c',
    name: 'Краторная булка N-200i',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
    __v: 0
}]

describe("ingredients", () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    test("should return initial state", () => {
        expect(ingredientsReducer(undefined, { type: "" })).toEqual(initialState);
    })

    test("should response fulfilled with 'getIngredientsThunk'", async () => {
        jest.spyOn(global, "fetch").mockResolvedValue({
            ...new Response(),
            ok: true,
            json: () => Promise.resolve({ data: mockIngredients }),
        })

        const dispatch = jest.fn();
        const thunk = getIngredientsThunk();

        await thunk(dispatch, store.getState, undefined)

        const { calls } = dispatch.mock;
        expect(calls).toHaveLength(2);

        const [pending, fulfilled] = calls;
        expect(pending[0].type).toBe("normaapi/ingredients/pending");
        expect(fulfilled[0].type).toBe("normaapi/ingredients/fulfilled");

        expect(ingredientsReducer(undefined, pending[0]).ingredientsRequest).toBe(true);
        expect(ingredientsReducer(undefined, fulfilled[0]).ingredients).toEqual(mockIngredients);
    })

    test("should response rejected with 'getIngredientsThunk'", async () => {
        jest.spyOn(global, "fetch").mockResolvedValue({
            ...new Response(),
            ok: false,
        })

        const dispatch = jest.fn();
        const thunk = getIngredientsThunk();

        await thunk(dispatch, store.getState, undefined)

        const { calls } = dispatch.mock;
        expect(calls).toHaveLength(2);

        const [pending, rejected] = calls;
        expect(pending[0].type).toBe("normaapi/ingredients/pending");
        expect(rejected[0].type).toBe("normaapi/ingredients/rejected");

        expect(ingredientsReducer(undefined, pending[0]).ingredientsRequest).toBe(true);
        expect(ingredientsReducer(undefined, rejected[0]).ingredientsFailed).toBe(true);
    })
})