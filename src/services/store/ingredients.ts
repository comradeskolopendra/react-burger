import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getIngredientsThunk } from "../actions/ingredients";
import { IIngredient } from "../../utils/types";

interface IIngredientsState {
    ingredientsRequest: boolean;
    ingredientsFailed: boolean;
    ingredients: IIngredient[];
};

const initialState: IIngredientsState = {
    ingredientsRequest: false,
    ingredientsFailed: false,
    ingredients: [],
};

export const ingredientsSlice = createSlice({
    name: "ingredients",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getIngredientsThunk.pending, (state) => {
                state = {
                    ...state,
                    ingredientsFailed: false,
                    ingredientsRequest: true,
                };

                return state;
            })
            .addCase(getIngredientsThunk.rejected, (state) => {
                state = {
                    ...state,
                    ingredientsFailed: true,
                    ingredientsRequest: false,
                };

                return state;
            })
            .addCase(getIngredientsThunk.fulfilled, (state, action: PayloadAction<IIngredient[]>) => {
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

export default ingredientsSlice.reducer;
