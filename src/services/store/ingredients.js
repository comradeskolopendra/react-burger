import { createSlice } from "@reduxjs/toolkit";
import { getIngredientsThunk } from "../actions/ingredients";

const initialState = {
    ingredientsRequest: false,
    ingredientsFailed: false,
    ingredients: [],

    currentIngredient: null,
};

export const ingredientsSlice = createSlice({
    name: "ingredients",
    initialState,
    reducers: {
        setCurrentIngredient(state, action) {
            state = {
                ...state,
                currentIngredient: action.payload,
            };

            return state;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getIngredientsThunk.pending, (state, action) => {
                state = {
                    ...state,
                    ingredientsFailed: false,
                    ingredientsRequest: true,
                };

                return state;
            })
            .addCase(getIngredientsThunk.rejected, (state, action) => {
                state = {
                    ...state,
                    ingredientsFailed: true,
                    ingredientsRequest: false,
                };

                return state;
            })
            .addCase(getIngredientsThunk.fulfilled, (state, action) => {
                state = {
                    ...state,
                    ingredientsFailed: false,
                    ingredientsRequest: false,
                    ingredients: [...action.payload],
                };

                return state;
            });
    },
});

export const {
    setCurrentIngredient
} = ingredientsSlice.actions;

export default ingredientsSlice.reducer;
