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

export type AppDispatch<TReturn = void> = (action: AppActions | AppThunk<TReturn>) => TReturn;
