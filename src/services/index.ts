import { combineReducers, configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

import ingredientsSlice from "./store/ingredients";
import orderSlice from "./store/order";
import modalSlice from "./store/modal";
import constructorSlice from "./store/constructor";
import profileSlice from './store/profile';
import authSlice from "./store/auth";
import selectedOrderSlice from "./store/selected-order";
import feedReducer from "./store/feed";
import profileOrdersReducer from "./store/profile-orders";

import { socketMiddleware } from "./middleware/socket-middleware";
import {
    connect as feedConnect,
    disconnect as feedDisconnect,
    wsClose as feedWSClose,
    wsConnecting as feedWSConnecting,
    wsError as feedWSError,
    wsMessage as feedWSMessage,
    wsOpen as FEED_WS_OPEN
}
    from "./actions/feed";

import {
    connect as profileOrdersConnect,
    disconnect as profileOrdersDisconnect,
    wsClose as profileOrdersWSClose,
    wsConnecting as profileOrdersWSConnecting,
    wsError as profileOrdersWSError,
    wsMessage as profileOrdersWSMessage,
    wsOpen as profileOrdersWSOpen
}
    from "./actions/profile-orders";


export const rootReducer = combineReducers({
    ingredients: ingredientsSlice,
    order: orderSlice,
    modal: modalSlice,
    constructorData: constructorSlice,
    auth: authSlice,
    profile: profileSlice,
    feed: feedReducer,
    profileOrders: profileOrdersReducer,
    selectedOrder: selectedOrderSlice,
});

const profileSocketMiddleware = socketMiddleware({
    wsConnect: profileOrdersConnect,
    wsDisconnect: profileOrdersDisconnect,
    wsConnecting: profileOrdersWSConnecting,
    onError: profileOrdersWSError,
    onMessage: profileOrdersWSMessage,
    onOpen: profileOrdersWSOpen,
    onClose: profileOrdersWSClose
})

const feedSocketMiddleware = socketMiddleware({
    wsConnect: feedConnect,
    wsDisconnect: feedDisconnect,
    wsConnecting: feedWSConnecting,
    onError: feedWSError,
    onMessage: feedWSMessage,
    onOpen: FEED_WS_OPEN,
    onClose: feedWSClose
})

export const store = configureStore({
    devTools: true,
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(feedSocketMiddleware, profileSocketMiddleware)
})