import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    visibleIngredient: false,
    visibleOrder: false,
}

export const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        setVisibleIngredient(state, action) {
            state = {
                ...state,
                visibleIngredient: action.payload
            }

            return state;
        },

        setVisibleOrder(state, action) {
            state = {
                ...state,
                visibleOrder: action.payload
            }

            return state;
        }
    }
})

export const { setVisibleIngredient, setVisibleOrder } = modalSlice.actions;
export default modalSlice.reducer;