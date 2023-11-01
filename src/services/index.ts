import { combineReducers, configureStore } from "@reduxjs/toolkit";
import ingredientsSlice from "./store/ingredients";
import orderSlice from "./store/order";
import modalSlice from "./store/modal";
import constructorSlice from "./store/constructor";
import profileSlice from './store/profile';
import authSlice from "./store/auth";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
    ingredients: ingredientsSlice,
    order: orderSlice,
    modal: modalSlice,
    constructorData: constructorSlice,
    auth: authSlice,
    profile: profileSlice
});

export const store = configureStore({
    devTools: true,
    reducer: rootReducer,
    middleware: [thunk]
})