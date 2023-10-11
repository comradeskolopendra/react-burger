import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedBun: null,
    selectedIngredients: []
}

export const constructorSlice = createSlice({
    name: "constructor",
    initialState,
    reducers: {
        clearConstructor(state, action) {
            state.selectedBun = null;
            state.selectedIngredients = [];

            return state;
        },

        setConstructorIngredient(state, action) {
            state = {
                ...state,
                selectedIngredients: [...state.selectedIngredients, action.payload],
            };

            return state;
        },

        sortConstuctorIngredient(state, action) {
            const { hoverIndex, dragIndex } = action.payload;
            const ingredients = [...state.selectedIngredients];

            [ingredients[dragIndex], ingredients[hoverIndex]] = [ingredients[hoverIndex], ingredients[dragIndex]];

            state = {
                ...state,
                selectedIngredients: ingredients
            }

            return state;
        },

        removeConstructorIngredient(state, action) {
            state = {
                ...state,
                selectedIngredients: [...state.selectedIngredients].filter(element => element.uuid !== action.payload),
            };

            return state;
        },

        setConstructorBun(state, action) {
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