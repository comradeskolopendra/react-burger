import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getIngredientsThunk } from "../actions/ingredients";
import { IIngredient } from "../../utils/types";

export interface IIngredientsState {
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
                    ingredients: [],
                    ingredientsFailed: false,
                    ingredientsRequest: true,
                };

                return state;
            })
            .addCase(getIngredientsThunk.rejected, (state) => {
                state = {
                    ingredients: [],
                    ingredientsFailed: true,
                    ingredientsRequest: false,
                };

                return state;
            })
            .addCase(getIngredientsThunk.fulfilled, (state, action: PayloadAction<IIngredient[]>) => {
                state = {
                    ingredientsFailed: false,
                    ingredientsRequest: false,
                    ingredients: [...action.payload],
                };

                return state;
            });
    },
});

type TIngredientsActionCreators = typeof ingredientsSlice.actions;
export type TIngredientsActions = ReturnType<TIngredientsActionCreators[keyof TIngredientsActionCreators]>
export default ingredientsSlice.reducer;
