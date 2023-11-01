import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IModalState {
    visibleIngredient: boolean;
    visibleOrder: boolean;
}

const initialState: IModalState = {
    visibleIngredient: false,
    visibleOrder: false,
}

export const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        setVisibleIngredient(state, action: PayloadAction<boolean>) {
            state = {
                ...state,
                visibleIngredient: action.payload
            }

            return state;
        },

        setVisibleOrder(state, action: PayloadAction<boolean>) {
            state = {
                ...state,
                visibleOrder: action.payload
            }

            return state;
        }
    }
})

export type TModalActions = typeof modalSlice.actions;
export const { setVisibleIngredient, setVisibleOrder } = modalSlice.actions;
export default modalSlice.reducer;