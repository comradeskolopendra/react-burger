import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IIngredient, TConstructorIngredient } from '../../utils/types';

type TConstructorState = {
    selectedBun: IIngredient | null;
    selectedIngredients: TConstructorIngredient[];
};

type TSortIngredients = {
    hoverIndex: number;
    dragIndex: number;
}

const initialState: TConstructorState = {
    selectedBun: null,
    selectedIngredients: []
}

export const constructorSlice = createSlice({
    name: "constructor",
    initialState,
    reducers: {
        clearConstructor(state) {
            state.selectedBun = null;
            state.selectedIngredients = [];

            return state;
        },

        setConstructorIngredient(state, action: PayloadAction<TConstructorIngredient>) {
            state = {
                ...state,
                selectedIngredients: [...state.selectedIngredients, action.payload],
            };

            return state;
        },

        sortConstuctorIngredient(state, action: PayloadAction<TSortIngredients>) {
            const { hoverIndex, dragIndex } = action.payload;
            const ingredients = [...state.selectedIngredients];

            [ingredients[dragIndex], ingredients[hoverIndex]] = [ingredients[hoverIndex], ingredients[dragIndex]];

            state = {
                ...state,
                selectedIngredients: ingredients
            }

            return state;
        },

        removeConstructorIngredient(state, action: PayloadAction<string>) {
            state = {
                ...state,
                selectedIngredients: [...state.selectedIngredients].filter(element => element.uuid !== action.payload),
            };

            return state;
        },

        setConstructorBun(state, action: PayloadAction<IIngredient>) {
            state = {
                ...state,
                selectedBun: action.payload,
            };

            return state;
        },
    }
})

export const { removeConstructorIngredient, setConstructorBun, setConstructorIngredient, sortConstuctorIngredient, clearConstructor } = constructorSlice.actions;
export default constructorSlice.reducer;