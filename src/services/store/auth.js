import { createSlice } from "@reduxjs/toolkit";
import {
    loginUserThunk,
    refreshTokenThunk,
    registerUserThunk,
    resetPasswordThunk,
} from "../actions/auth";

const initialState = {
    user: {},

    registerRequest: false,
    registerError: false,

    resetPasswordRequest: false,
    resetPasswordError: false,

    loginRequest: false,
    loginError: false,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(registerUserThunk.rejected, (state) => {
                state = {
                    ...state,
                    registerError: true,
                    registerRequest: false,
                    user: {},
                };
                return state;
            })
            .addCase(registerUserThunk.pending, (state) => {
                state = {
                    ...state,
                    registerRequest: true,
                    registerError: false,
                    user: {},
                };
                return state;
            })
            .addCase(registerUserThunk.fulfilled, (state, action) => {
                state = {
                    ...state,
                    registerRequest: false,
                    registerError: false,
                    user: {
                        accessToken: action.payload.accessToken,
                    },
                };
                return state;
            })

            .addCase(resetPasswordThunk.rejected, (state) => {
                state = {
                    ...state,
                    resetPasswordError: true,
                    resetPasswordRequest: false,
                };
                return state;
            })
            .addCase(resetPasswordThunk.pending, (state) => {
                state = {
                    ...state,
                    resetPasswordError: false,
                    resetPasswordRequest: true,
                };
                return state;
            })
            .addCase(resetPasswordThunk.fulfilled, (state) => {
                state = {
                    ...state,
                    resetPasswordError: false,
                    resetPasswordRequest: false,
                };
                return state;
            })

            .addCase(loginUserThunk.rejected, (state) => {
                state = {
                    ...state,
                    loginError: true,
                    loginRequest: false,
                };

                return state;
            })
            .addCase(loginUserThunk.pending, (state) => {
                state = {
                    ...state,
                    loginError: false,
                    loginRequest: true,
                };

                return state;
            })
            .addCase(loginUserThunk.fulfilled, (state, action) => {
                console.log(action.payload.user)
                state = {
                    ...state,
                    user: {
                        ...action.payload.user,
                        password: action.payload.password,
                        accessToken: action.payload.accessToken
                    },
                    loginError: false,
                    loginRequest: false,
                };

                return state;
            })

            .addCase(refreshTokenThunk.fulfilled, (state, action) => {
                state = {
                    ...state,

                    user: {
                        ...state.user,
                        accessToken: action.payload.accessToken,
                    },
                };

                return state;
            });
    },
});

export default authSlice.reducer;
