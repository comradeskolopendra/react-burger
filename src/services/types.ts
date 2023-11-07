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

export type AppActions =
    | TIngredientsActions
    | TAuthActions
    | TConstructorActions
    | TModalActions
    | TOrderActions
    | TProfileActions
    | TWSFeedActions;

export interface IFeedOrder {
    _id: string;
    createdAt: string;
    ingredients: string[];
    name: string;
    number: number;
    status: string;
    updatedAt: string;
}

export interface IWSFeedMessage {
    orders: IFeedOrder[];
    success: boolean;
    total: number;
    totalToday: number;
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppThunk<TReturn = void> = ThunkAction<
    TReturn,
    RootState,
    unknown,
    AppActions
>;

export type AppDispatch<TReturn = void> = (action: AppActions | AppThunk<TReturn>) => TReturn;
