import { createSlice } from "@reduxjs/toolkit";
import { getIngredientsThunk } from "../actions/ingredients";

const initialState = {
    ingredientsRequest: false,
    ingredientsFailed: false,
    ingredients: [],

    constructorIngredients: {
        selectedBun: null,
        selectedIngredients: [],
    },

    currentIngredient: null,

    price: 0,
};

export const ingredientsSlice = createSlice({
    name: "ingredients",
    initialState,
    reducers: {
        clearConstructor(state, action) {
            state = {
                ...state,
                constructorIngredients: {
                    selectedBun: null,
                    selectedIngredients: []
                }
            }

            return state;
        },

        setConstructorIngredients(state, action) {
            state = {
                ...state,
                constructorIngredients: {
                    ...state.constructorIngredients,
                    selectedIngredients: action.payload,
                },
            };

            return state;
        },

        setConstructorBun(state, action) {
            state = {
                ...state,
                constructorIngredients: {
                    ...state.constructorIngredients,
                    selectedBun: action.payload,
                },
            };

            return state;
        },

        setCurrentIngredient(state, action) {
            state = {
                ...state,
                currentIngredient: action.payload,
            };

            return state;
        },

        setPrice(state, action) {
            state = {
                ...state,
                price: action.payload,
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
    setCurrentIngredient,
    setConstructorIngredients,
    setPrice,
    setConstructorBun,
    clearConstructor,
} = ingredientsSlice.actions;

export default ingredientsSlice.reducer;
