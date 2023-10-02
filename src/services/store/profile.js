import { createSlice } from "@reduxjs/toolkit";

import { getUserInfoThunk, changeUserInfoThunk } from "../actions/profile";

const initialState = {
    user: {
        name: "",
        email: "",
    },
    userError: false,
    userRequest: false,
};

export const profileSlice = createSlice({
    name: "profile",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getUserInfoThunk.rejected, (state, action) => {
                state = {
                    ...state,
                    userError: true,
                    userRequest: false,
                };

                return state;
            })
            .addCase(getUserInfoThunk.pending, (state, action) => {
                state = {
                    ...state,
                    userError: false,
                    userRequest: true,
                };

                return state;
            })
            .addCase(getUserInfoThunk.fulfilled, (state, action) => {
                const { user } = action.payload;
                state = {
                    user: { ...user },
                    userError: false,
                    userRequest: false,
                };

                return state;
            })

            .addCase(changeUserInfoThunk.rejected, (state, action) => {
                state = {
                    ...state,
                    userError: true,
                    userRequest: true,
                };

                return state;
            })
            .addCase(changeUserInfoThunk.pending, (state, action) => {
                state = {
                    ...state,
                    userError: false,
                    userRequest: true,
                };

                return state;
            })
            .addCase(changeUserInfoThunk.fulfilled, (state, action) => {
                const { user } = action.payload;
                state = {
                    user: { ...user },
                    userError: false,
                    userRequest: false,
                };

                return state;
            });
    },
});

export default profileSlice.reducer;
