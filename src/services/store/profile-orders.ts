import { createReducer } from "@reduxjs/toolkit";
import type { IWSMessage } from "../../utils/types";
import { wsClose, wsConnecting, wsError, wsOpen, wsMessage } from "../actions/profile-orders";
import { TWSStatus, EWSStatus } from "../types";

export interface IProfileOrders {
    status: TWSStatus;
    wsMessage: IWSMessage | null;
    connectingError: string;
}

const initialState: IProfileOrders = {
    status: EWSStatus.OFFLINE,
    wsMessage: null,
    connectingError: ""
}

const profileOrdersReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(wsConnecting, (state) => {
            state = {
                ...state,
                status: EWSStatus.CONNECTING
            }

            return state;
        })
        .addCase(wsOpen, (state) => {
            state = {
                ...state,
                status: EWSStatus.ONLINE,
                connectingError: ""
            }

            return state;
        })
        .addCase(wsClose, (state) => {
            state = {
                ...state,
                status: EWSStatus.OFFLINE
            }

            return state;
        })
        .addCase(wsError, (state, action) => {
            state = {
                ...state,
                connectingError: action.payload
            }

            return state;
        })
        .addCase(wsMessage, (state, action) => {
            state = {
                ...state,
                wsMessage: action.payload
            }

            return state;
        })
});

export default profileOrdersReducer;