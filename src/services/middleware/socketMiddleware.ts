import type { Middleware, MiddlewareAPI } from "redux";
import type { AppActions, AppDispatch, RootState } from "../types";
import { setWSClose, setWSConnected, setWSError, setWSMessage } from "../store/ordersFeed";

export const socketMiddleware = (): Middleware => {
    return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
        let socket: WebSocket | null = null;
        return (next) => (action: AppActions) => {
            const { getState, dispatch } = store;
            const { type, payload } = action;

            if (type === "ordersFeed/setWSConnect") {
                socket = new WebSocket(payload);
            }

            if (socket) {
                socket.onopen = (event: Event) => {
                    dispatch(setWSConnected());
                }

                socket.onmessage = (event: MessageEvent) => {
                    const { data } = event;

                    if (data === "ping") {
                        socket!.send("pong")
                    } else {
                        dispatch(setWSMessage(JSON.parse(data)));
                    }
                }

                socket.onerror = (event: Event) => {
                    dispatch(setWSError());
                }

                socket.onclose = (event: CloseEvent) => {
                    dispatch(setWSClose());
                }

                if (type === "order/clearOrder") {
                    const message = payload;
                    socket.send(JSON.stringify(message))
                }
            }

            next(action);
        }
    }) as Middleware
} 