import { ThunkAction } from "redux-thunk";
import { rootReducer } from "./";
import type {
    TIngredientsActions,
    TAuthActions,
    TConstructorActions,
    TModalActions,
    TOrderActions,
    TProfileActions,
} from "./store";


import { TWSFeedActions } from "./actions/feed";
import { TWSProfileOrdersActions } from "./actions/profile-orders";

export type AppActions =
    | TIngredientsActions
    | TAuthActions
    | TConstructorActions
    | TModalActions
    | TOrderActions
    | TProfileActions
    | TWSFeedActions
    | TWSProfileOrdersActions;

export type RootState = ReturnType<typeof rootReducer>;
export type AppThunk<TReturn = void> = ThunkAction<
    TReturn,
    RootState,
    unknown,
    AppActions
>;

export interface IGetOrderByNumber {
    success: boolean;
    orders: {
        _id: string;
        ingredients: string[];
        owner: string;
        status: string;
        name: string;
        createdAt: string;
        updatedAt: string;
        number: number;
        __v: number;
    }[];
}

export enum EWSStatus {
    OFFLINE = "OFFLINE",
    ONLINE = "ONLINE",
    CONNECTING = "CONNECTING",
    CLOSING = "CLOSING"
}

export type TWSStatus = EWSStatus.CLOSING | EWSStatus.ONLINE | EWSStatus.OFFLINE | EWSStatus.CONNECTING

export type AppDispatch<TReturn = void> = (action: AppActions | AppThunk<TReturn>) => TReturn;
