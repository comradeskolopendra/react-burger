import { createSlice } from "@reduxjs/toolkit";
import {
    changePasswordThunk,
    loginUserThunk,
    registerUserThunk,
    resetPasswordThunk,
} from "../actions/auth";

const initialState = {
    isRequest: false,
    isError: false,
    isLoaded: false,
    isAuthChecked: false,
    isPasswordSuccessfullyChanged: false,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuthChecked(state, action) {
            state = {
                ...state,
                isAuthChecked: action.payload,
            };

            return state;
        },
    },
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
                    ...state,
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
                state = {
                    ...state,
                    isLoaded: true,
                    isError: false,
                    isRequest: false,
                };

                return state;
            })
            .addCase(changePasswordThunk.rejected, (state, action) => {
                state = {
                    ...state,
                    isPasswordSuccessfullyChanged: false,
                    isRequest: false,
                    isError: true,
                };

                return state;
            })
            .addCase(changePasswordThunk.pending, (state, action) => {
                state = {
                    ...state,
                    isPasswordSuccessfullyChanged: false,
                    isRequest: true,
                    isError: false,
                };

                return state;
            })
            .addCase(changePasswordThunk.fulfilled, (state, action) => {
                state = {
                    ...state,
                    isPasswordSuccessfullyChanged: true,
                    isRequest: false,
                    isError: false,
                };

                return state;
            });
    },
});

export const { setAuthChecked } = authSlice.actions;

export default authSlice.reducer;
