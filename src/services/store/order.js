import { createSlice } from "@reduxjs/toolkit";
import { createOrderThunk } from "../actions/order";

// store:
// 1. order

const initialState = {
    order: {},
    orderRequest: false,
    orderFailed: false
}

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        clearOrder(state, action) {
            state = initialState;
            return state;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createOrderThunk.pending, (state, action) => {
                state = {
                    ...state,
                    orderRequest: true,
                    orderFailed: false
                }

                return state;
            })
            .addCase(createOrderThunk.rejected, (state, action) => {
                state = {
                    ...state,
                    orderRequest: false,
                    orderFailed: true
                }

                return state;
            })
            .addCase(createOrderThunk.fulfilled, (state, action) => {
                state = {
                    orderRequest: false,
                    orderFailed: false,
                    order: action.payload
                }

                return state;
            })
    }
})

export const { clearOrder } = orderSlice.actions;
export default orderSlice.reducer;