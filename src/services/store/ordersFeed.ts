import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface IOrder {
    _id: string;
    createdAt: string;
    ingredients: string[];
    name: string;
    number: number;
    status: string;
    updatedAt: string;
}

interface IWSMessage {
    orders: IOrder[];
    success: boolean;
    total: number;
    totalToday: number;
}

interface IOrdersFeed {
    wsConnected: boolean;
    wsLoading: boolean;
    wsError: boolean;
    wsConnect: boolean;
    wsMessage: IWSMessage | null;
}

const initialState: IOrdersFeed = {
    wsConnected: false,
    wsLoading: false,
    wsError: false,
    wsConnect: false,
    wsMessage: null
}

export const ordersFeedSlice = createSlice({
    name: "ordersFeed",
    initialState,
    reducers: {
        setWSConnected(state, action: PayloadAction<undefined>) {
            state = {
                ...state,
                wsConnect: false,
                wsConnected: true,
                wsLoading: false,
                wsError: false
            }

            return state;
        },

        setWSError(state, action: PayloadAction<undefined>) {
            state = {
                ...state,
                wsConnect: false,
                wsConnected: false,
                wsLoading: false,
                wsError: true
            }

            return state;
        },

        setWSLoading(state, action: PayloadAction<undefined>) {
            state = {
                ...state,
                wsConnect: false,
                wsConnected: false,
                wsError: false,
                wsLoading: true
            };

            return state;
        },

        setWSClose(state) {
            state = {
                ...state,
                wsConnect: false,
                wsConnected: false,
                wsError: false,
                wsLoading: false
            }

            return state;
        },

        setWSConnect(state, action: PayloadAction<string>) {
            state = {
                ...state,
                wsConnect: true,
                wsConnected: false,
                wsError: false,
                wsLoading: false,
            }

            return state;
        },

        setWSMessage(state, action: PayloadAction<IWSMessage>) {
            state = {
                ...state,
                wsMessage: action.payload
            }
        }
    }
}
)

export type TOrdersFeedActions = typeof ordersFeedSlice.actions;
export const { setWSConnected, setWSError, setWSLoading, setWSClose, setWSConnect, setWSMessage } = ordersFeedSlice.actions;

export default ordersFeedSlice.reducer;