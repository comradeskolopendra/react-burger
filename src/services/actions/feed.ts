import { createAction } from "@reduxjs/toolkit";
import type { IWSFeedMessage } from "../types";

export const connect = createAction<string, "FEED_WS_CONNECT">("FEED_WS_CONNECT");
export const disconnect = createAction<void, "FEED_WS_DISCONNECT">("FEED_WS_DISCONNECT");
export const wsConnecting = createAction<void, "FEED_WS_CONNECTING">("FEED_WS_CONNECTING");
export const wsOpen = createAction<void, "FEED_WS_OPEN">("FEED_WS_OPEN");
export const wsClose = createAction<void, "FEED_WS_CLOSE">("FEED_WS_CLOSE");
export const wsMessage = createAction<IWSFeedMessage, "FEED_WS_MESSAGE">("FEED_WS_MESSAGE");
export const wsError = createAction<string, "FEED_WS_ERROR">("FEED_WS_ERROR");

export type TWSFeedActions = ReturnType<typeof connect>
    | ReturnType<typeof disconnect>
    | ReturnType<typeof wsConnecting>
    | ReturnType<typeof wsOpen>
    | ReturnType<typeof wsClose>
    | ReturnType<typeof wsMessage>
    | ReturnType<typeof wsError>