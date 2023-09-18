import { createSlice } from "@reduxjs/toolkit";
import { getIngredientsThunk } from "../actions/ingredients";

// store:
// 1. ingredients, done
// 2. constructorIngredients, done
// 3. setConstructorIngredients, done
// 4. currentIngredient, done
// 5. setCurrentIngredient; done

const initialState = {
    ingredientsRequest: false,
    ingredientsFailed: false,
    ingredients: [],

    constructorIngredients: [],

    currentIngredient: null,

    price: 0
};

export const ingredientsSlice = createSlice({
    name: "ingredients",
    initialState,
    reducers: {
        setConstructorIngredients(state, action) {
            state = {
                ...state,
                constructorIngredients: action.payload
            }
            return state;
        },

        setCurrentIngredient(state, action) {
            state = {
                ...state,
                currentIngredient: action.payload
            }

            return state;
        },
        setPrice(state, action) {
            console.log(action.payload)
            state = {
                ...state,
                price: action.payload
            }

            return state;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getIngredientsThunk.pending, (state, action) => {
                state = {
                    ...state,
                    ingredientsFailed: false,
                    ingredientsRequest: true
                }

                return state;
            })
            .addCase(getIngredientsThunk.rejected, (state, action) => {
                state = {
                    ...state,
                    ingredientsFailed: true,
                    ingredientsRequest: false
                }

                return state;
            })
            .addCase(getIngredientsThunk.fulfilled, (state, action) => {
                state = {
                    ...state,
                    ingredientsFailed: false,
                    ingredientsRequest: false,
                    ingredients: [...action.payload],
                }

                return state;
            })
    }
})

export const { setCurrentIngredient, setConstructorIngredients, setPrice } = ingredientsSlice.actions;

export default ingredientsSlice.reducer;