import { createAction } from "@reduxjs/toolkit";
import type { IWSMessage } from "../../utils/types";

export const connect = createAction<string>("FEED_WS_CONNECT");
export const disconnect = createAction("FEED_WS_DISCONNECT");
export const wsConnecting = createAction("FEED_WS_CONNECTING");
export const wsOpen = createAction("FEED_WS_OPEN");
export const wsClose = createAction("FEED_WS_CLOSE");
export const wsMessage = createAction<IWSMessage, "FEED_WS_MESSAGE">("FEED_WS_MESSAGE");
export const wsError = createAction<string, "FEED_WS_ERROR">("FEED_WS_ERROR");

export type TWSFeedActions = ReturnType<typeof connect>
    | ReturnType<typeof disconnect>
    | ReturnType<typeof wsConnecting>
    | ReturnType<typeof wsOpen>
    | ReturnType<typeof wsClose>
    | ReturnType<typeof wsMessage>
    | ReturnType<typeof wsError>