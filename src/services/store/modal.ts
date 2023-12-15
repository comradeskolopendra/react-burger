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
        setVisibleOrder(state, action: PayloadAction<boolean>) {
            state = {
                ...state,
                visibleOrder: action.payload
            }

            return state;
        }
    }
})

type TModalActionCreators = typeof modalSlice.actions;
export type TModalActions = ReturnType<TModalActionCreators[keyof TModalActionCreators]>
export const { setVisibleOrder } = modalSlice.actions;
export default modalSlice.reducer;