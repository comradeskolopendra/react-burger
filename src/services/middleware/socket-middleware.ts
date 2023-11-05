import type { Middleware, MiddlewareAPI } from "redux";
import type { AppDispatch, RootState } from "../types";
import { ActionCreatorWithPayload, ActionCreatorWithoutPayload } from "@reduxjs/toolkit";

export type TWSActionTypes = {
    wsConnect: ActionCreatorWithPayload<string>;
    wsDisconnect: ActionCreatorWithoutPayload;
    wsSendMessage?: ActionCreatorWithPayload<any>;
    wsConnecting: ActionCreatorWithoutPayload;
    onOpen: ActionCreatorWithoutPayload;
    onClose: ActionCreatorWithoutPayload;
    onError: ActionCreatorWithPayload<string>;
    onMessage: ActionCreatorWithPayload<any>;
}

export const socketMiddleware = (wsActions: TWSActionTypes): Middleware<{}> => {
    return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
        let socket: WebSocket | null = null;
        return (next) => (action) => {
            const { dispatch } = store;
            const { payload } = action;
            console.log(wsActions.wsDisconnect)
            const { wsConnect,
                wsConnecting,
                wsDisconnect,
                wsSendMessage,
                onClose,
                onError,
                onMessage,
                onOpen }
                = wsActions

            console.log(wsDisconnect().type);

            if (wsConnect.match(action)) {
                socket = new WebSocket(action.payload);
                dispatch(wsConnecting());
            }

            if (socket) {
                socket.onopen = (event: Event) => {
                    dispatch(onOpen());
                };

                socket.onerror = (event: Event) => {
                    dispatch(onError('Error'));
                }

                socket.onmessage = (event: MessageEvent) => {
                    const { data } = event;
                    const parsedData = JSON.parse(data);

                    dispatch(onMessage(parsedData));
                }

                socket.onclose = (event: CloseEvent) => {
                    dispatch(onClose());
                }

                if (wsSendMessage && wsSendMessage.match(action)) {
                    socket.send(JSON.stringify(payload));
                }

                if (wsDisconnect.match(action)) {
                    socket.close();
                    socket = null;
                }
            }


            next(action);
        }
    })
} 