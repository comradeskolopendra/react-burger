import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { createOrderThunk } from "../actions/order";
import type { IOrder } from '../../utils/types';

interface IOrderState {
    order: IOrder | null;
    orderRequest: boolean;
    orderFailed: boolean;
}

const initialState: IOrderState = {
    order: null,
    orderRequest: false,
    orderFailed: false
}

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        clearOrder(state) {
            state = initialState;
            return state;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createOrderThunk.pending, (state) => {
                state = {
                    ...state,
                    orderRequest: true,
                    orderFailed: false
                }

                return state;
            })
            .addCase(createOrderThunk.rejected, (state) => {
                state = {
                    ...state,
                    orderRequest: false,
                    orderFailed: true
                }

                return state;
            })
            .addCase(createOrderThunk.fulfilled, (state, action: PayloadAction<IOrder>) => {
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