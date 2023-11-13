import { createSlice } from "@reduxjs/toolkit";
import { getOrderByNumber } from "../actions/selected-order";
import { IGetOrderByNumber } from "../types";

interface IInitialState {
    data: IGetOrderByNumber;
    reqError: boolean;
    reqLoading: boolean;
}

const initialState: IInitialState = {
    data: {
        success: false,
        orders: [
            {
                _id: "",
                ingredients: [""],
                owner: "",
                status: "",
                name: "",
                createdAt: "",
                updatedAt: "",
                number: 0,
                __v: 0,
            },
        ],
    },
    reqError: false,
    reqLoading: false,
};

export const selectedOrderSlice = createSlice({
    name: "selectedOrder",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getOrderByNumber.rejected, (state) => {
                state.reqError = true;

                return state;
            })
            .addCase(getOrderByNumber.pending, (state) => {
                state.reqLoading = true;

                return state;
            })
            .addCase(getOrderByNumber.fulfilled, (state, action) => {
                state = {
                    reqError: false,
                    reqLoading: false,
                    data: action.payload
                }

                return state;
            });
    },
});

export default selectedOrderSlice.reducer;