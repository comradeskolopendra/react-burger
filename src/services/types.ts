import { ThunkAction } from "redux-thunk";
import { store } from "./";
import type {
    TIngredientsActions,
    TAuthActions,
    TConstructorActions,
    TModalActions,
    TOrderActions,
    TProfileActions,
} from "./store";

export type AppActions =
    | ReturnType<TIngredientsActions[keyof TIngredientsActions]>
    | ReturnType<TAuthActions[keyof TAuthActions]>
    | ReturnType<TConstructorActions[keyof TConstructorActions]>
    | ReturnType<TModalActions[keyof TModalActions]>
    | ReturnType<TOrderActions[keyof TOrderActions]>
    | ReturnType<TProfileActions[keyof TProfileActions]>;

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<TReturn = void> = ThunkAction<
    TReturn,
    RootState,
    unknown,
    AppActions
>;

export type AppDispatch<TReturn = void> = (action: AppActions | AppThunk<TReturn>) => TReturn;
