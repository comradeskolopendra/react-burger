import { createSlice } from "@reduxjs/toolkit";
import {
    loginUserThunk,
    registerUserThunk,
    resetPasswordThunk,
    logoutUserThunk
} from "../actions/auth";

const initialState = {
    user: {},

    isRequest: false,
    isError: false
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(registerUserThunk.rejected, (state) => {
                state = {
                    ...state,
                    isError: true,
                    isRequest: false,
                };
                return state;
            })
            .addCase(registerUserThunk.pending, (state) => {
                state = {
                    ...state,
                    isRequest: true,
                    isError: false,
                };
                return state;
            })
            .addCase(registerUserThunk.fulfilled, (state, action) => {
                state = {
                    user: {
                        ...action.payload.user
                    },
                    isRequest: false,
                    isError: false,
                };
                return state;
            })

            .addCase(resetPasswordThunk.rejected, (state) => {
                state = {
                    ...state,
                    isError: true,
                    isRequest: false,
                };
                return state;
            })
            .addCase(resetPasswordThunk.pending, (state) => {
                state = {
                    ...state,
                    isError: false,
                    isRequest: true,
                };
                return state;
            })
            .addCase(resetPasswordThunk.fulfilled, (state) => {
                state = {
                    ...state,
                    isError: false,
                    isRequest: false,
                };
                return state;
            })

            .addCase(loginUserThunk.rejected, (state) => {
                state = {
                    ...state,
                    isError: true,
                    isRequest: false,
                };

                return state;
            })
            .addCase(loginUserThunk.pending, (state) => {
                state = {
                    ...state,
                    isError: false,
                    isRequest: true,
                };

                return state;
            })
            .addCase(loginUserThunk.fulfilled, (state, action) => {
                console.log(action.payload)
                state = {
                    user: {
                        ...action.payload.user,
                    },
                    isError: false,
                    isRequest: false,
                };

                return state;
            })
    },
});

export default authSlice.reducer;
