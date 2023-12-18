import constructorReducer, { sortConstuctorIngredient, removeConstructorIngredient, setConstructorBun, setConstructorIngredient, clearConstructor, IConstructorState } from "../store/constructor";

const initialState: IConstructorState = {
    selectedBun: null,
    selectedIngredients: []
}

const bunTest = {
    __v: 0,
    _id: "643d69a5c3f7b9001cfa093c",
    calories: 420,
    carbohydrates: 53,
    fat: 24,
    image: "https://code.s3.yandex.net/react/code/bun-02.png",
    image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
    image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
    name: "Краторная булка N-200i",
    price: 1255,
    proteins: 80,
    type: "bun",
};

const ingredientTest = {
    __v: 0,
    _id: "643d69a5c3f7b9001cfa0941",
    calories: 4242,
    carbohydrates: 242,
    fat: 142,
    image: "https://code.s3.yandex.net/react/code/meat-01.png",
    image_large: "https://code.s3.yandex.net/react/code/meat-01-large.png",
    image_mobile: "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
    name: "Биокотлета из марсианской Магнолии",
    price: 424,
    proteins: 420,
    type: "main",
    uuid: "drag ingredient"
}

const dragIngredient = {
    __v: 0,
    _id: "643d69a5c3f7b9001cfa0941",
    calories: 4242,
    carbohydrates: 242,
    fat: 142,
    image: "https://code.s3.yandex.net/react/code/meat-01.png",
    image_large: "https://code.s3.yandex.net/react/code/meat-01-large.png",
    image_mobile: "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
    name: "Биокотлета из марсианской Магнолии",
    price: 424,
    proteins: 420,
    type: "main",
    uuid: "drop ingredient"
}

describe("constructor slice", () => {
    test("should return initial state", () => {
        expect(constructorReducer(undefined, { type: "" })).toEqual(initialState);
    })

    test("should clear constructor slice", () => {
        const localInitialState = { selectedBun: bunTest, selectedIngredients: [] }
        const clear = clearConstructor();
        const result = constructorReducer(localInitialState, clear);

        expect(result.selectedBun).toBe(null);
    })

    test("should add constructor ingredient", () => {
        const addIngredient = setConstructorIngredient(ingredientTest);
        const result = constructorReducer(undefined, addIngredient);

        expect(result.selectedIngredients[0]).toEqual(ingredientTest);
    })

    test("should add constructor bun", () => {
        const addBun = setConstructorBun(bunTest);
        const result = constructorReducer(undefined, addBun);

        expect(result.selectedBun).toEqual(bunTest);
    })

    test("should remove constructor ingredient", () => {
        const localInitialState = { selectedBun: null, selectedIngredients: [{ ...ingredientTest }] };
        const removeIngredient = removeConstructorIngredient("drag ingredient");
        const result = constructorReducer(localInitialState, removeIngredient);

        expect(result.selectedIngredients).toEqual([]);
    })

    test("should sort constructor ingredients", () => {
        const localInitialState = { selectedBun: null, selectedIngredients: [ingredientTest, dragIngredient] }
        const sortIngredients = sortConstuctorIngredient({ dragIndex: 0, hoverIndex: 1 });
        const result = constructorReducer(localInitialState, sortIngredients);

        expect(result.selectedIngredients[0]).toEqual(dragIngredient);
        expect(result.selectedIngredients[1]).toBe(ingredientTest);
    })
})