import { combineReducers, configureStore } from "@reduxjs/toolkit";
import ingredientsSlice from "./store/ingredients";
import orderSlice from "./store/order";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
    ingredients: ingredientsSlice,
    order: orderSlice
})

export const store = configureStore({
    devTools: true,
    reducer: rootReducer,
    middleware: [thunk]
})