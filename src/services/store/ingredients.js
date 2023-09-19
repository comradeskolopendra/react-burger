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

        setConstructorIngredient(state, action) {
            state = {
                ...state,
                constructorIngredients: {
                    ...state.constructorIngredients,
                    selectedIngredients: [...state.constructorIngredients.selectedIngredients, action.payload],
                },
            };

            return state;
        },

        sortConstuctorIngredient(state, action) {
            const { hoverIndex, dragIndex } = action.payload;
            const ingredients = [...state.constructorIngredients.selectedIngredients];

            [ingredients[dragIndex], ingredients[hoverIndex]] = [ingredients[hoverIndex], ingredients[dragIndex]];

            state = {
                ...state,
                constructorIngredients: {
                    ...state.constructorIngredients,
                    selectedIngredients: ingredients
                }
            }

            return state;
        },

        removeConstructorIngredient(state, action) {
            state = {
                ...state,
                constructorIngredients: {
                    ...state.constructorIngredients,
                    selectedIngredients: [...state.constructorIngredients.selectedIngredients].filter(element => element.uuid !== action.payload),
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
    setConstructorIngredient,
    setPrice,
    setConstructorBun,
    clearConstructor,
    removeConstructorIngredient,
    sortConstuctorIngredient
} = ingredientsSlice.actions;

export default ingredientsSlice.reducer;
