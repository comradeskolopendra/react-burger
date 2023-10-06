import { createSlice } from "@reduxjs/toolkit";

import { getUserInfoThunk, changeUserInfoThunk } from "../actions/profile";

const initialState = {
    user: null,
    userError: false,
    userRequest: false,
};

export const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        clearUser(state, aciton) {
            state = {
                ...state,
                user: null,
            };

            return state;
        },
        setUser(state, action) {
            const { user } = action.payload;
            state = {
                ...state,
                user: { ...user },
            };

            return state;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUserInfoThunk.rejected, (state, action) => {
                state = {
                    user: null,
                    userError: true,
                    userRequest: false,
                };

                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");

                return state;
            })
            .addCase(getUserInfoThunk.pending, (state, action) => {
                state = {
                    user: null,
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
                    user: null,
                    userError: true,
                    userRequest: true,
                };

                return state;
            })
            .addCase(changeUserInfoThunk.pending, (state, action) => {
                state = {
                    user: null,
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

export const { clearUser, setUser } = profileSlice.actions;

export default profileSlice.reducer;
