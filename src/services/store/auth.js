import { createSlice } from "@reduxjs/toolkit";
import { registerUserThunk, resetPasswordThunk } from "../actions/auth";

const initialState = {
    registerRequest: false,
    registerError: false,
    register: {},

    resetPasswordRequest: false,
    resetPasswordError: false,
}

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
                    register: {}
                }
                return state;
            })
            .addCase(registerUserThunk.pending, (state) => {
                state = {
                    ...state,
                    registerRequest: true,
                    registerError: false,
                    register: {}
                }
                return state;
            })
            .addCase(registerUserThunk.fulfilled, (state, action) => {
                state = {
                    ...state,
                    registerRequest: false,
                    registerError: false,
                    register: { ...action.payload.user, accessToken: action.payload.accessToken }
                }
                return state;
            })


            .addCase(resetPasswordThunk.rejected, (state) => {
                state = {
                    ...state,
                    resetPasswordError: true,
                    resetPasswordRequest: false
                }
                return state;
            })
            .addCase(resetPasswordThunk.pending, (state) => {
                state = {
                    ...state,
                    resetPasswordError: false,
                    resetPasswordRequest: true
                }
                return state;
            })
            .addCase(resetPasswordThunk.fulfilled, (state) => {
                state = {
                    ...state,
                    resetPasswordError: false,
                    resetPasswordRequest: false
                }
                return state;
            })
    }
})

export const { setUserInfo } = authSlice.actions;

export default authSlice.reducer;