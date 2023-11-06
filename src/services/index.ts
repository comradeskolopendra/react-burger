import { combineReducers, configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

import ingredientsSlice from "./store/ingredients";
import orderSlice from "./store/order";
import modalSlice from "./store/modal";
import constructorSlice from "./store/constructor";
import profileSlice from './store/profile';
import authSlice from "./store/auth";
import feedReducer from "./store/feed";

import thunk from "redux-thunk";
import { socketMiddleware } from "./middleware/socket-middleware";
import { connect, disconnect, wsClose, wsConnecting, wsError, wsMessage, wsOpen } from "./actions/feed";

export const rootReducer = combineReducers({
    ingredients: ingredientsSlice,
    order: orderSlice,
    modal: modalSlice,
    constructorData: constructorSlice,
    auth: authSlice,
    profile: profileSlice,
    feed: feedReducer
});

const feedSocketMiddleware = socketMiddleware({
    wsConnect: connect,
    wsDisconnect: disconnect,
    wsConnecting: wsConnecting,
    onError: wsError,
    onMessage: wsMessage,
    onOpen: wsOpen,
    onClose: wsClose
})

export const store = configureStore({
    devTools: true,
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(feedSocketMiddleware)
})