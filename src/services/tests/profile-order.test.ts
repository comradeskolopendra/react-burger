import profileOrdersReducer, { IProfileOrders } from "../store/profile-orders";
import { wsClose, wsConnecting, wsError, wsMessage, wsOpen } from "../actions/profile-orders";
import type { IWSMessage } from "../../utils/types";
import { EWSStatus } from "../types";

const initialState: IProfileOrders = {
    status: EWSStatus.OFFLINE,
    wsMessage: null,
    connectingError: ""
}

const wsMessageSample: IWSMessage = {
    orders: [],
    success: true,
    total: 111,
    totalToday: 111,
}

describe("profile-orders websocket", () => {
    test("should return initial state", () => {
        expect(profileOrdersReducer(undefined, { type: "" })).toEqual(initialState);
    })

    test("should loading websocket", () => {
        const action = wsConnecting();
        const result = profileOrdersReducer(undefined, action);

        expect(result.status).toBe(EWSStatus.CONNECTING);
    })

    test("should open websocket", () => {
        const action = wsOpen();
        const result = profileOrdersReducer(undefined, action);

        expect(result.status).toBe(EWSStatus.ONLINE);
        expect(result.connectingError).toBe("");
    })

    test("should close websocket", () => {
        const action = wsClose();
        const result = profileOrdersReducer(undefined, action);

        expect(result.status).toBe(EWSStatus.OFFLINE)
    })

    test("should get error from websocket", () => {
        const action = wsError("error occured");
        const result = profileOrdersReducer(undefined, action);

        expect(result.connectingError).toBe("error occured");
    })

    test("should get message from websocket", () => {
        const action = wsMessage(wsMessageSample);
        const result = profileOrdersReducer(undefined, action);

        expect(result.wsMessage).toEqual(wsMessageSample)
    })
})