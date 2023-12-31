import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getUserInfoThunk, changeUserInfoThunk } from "../actions/profile";
import { IUser } from "../../utils/types";

export interface IProfileState {
    user: IUser | null;
    userError: boolean;
    userRequest: boolean;
}

const initialState: IProfileState = {
    user: null,
    userError: false,
    userRequest: false,
};

export const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        clearUser(state) {
            state = {
                ...state,
                user: null,
            };

            return state;
        },
        setUser(state, action: PayloadAction<IUser>) {
            const user = action.payload;
            state = {
                ...state,
                user: { ...user },
            };

            return state;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUserInfoThunk.rejected, (state) => {
                state = {
                    ...state,
                    userError: true,
                    userRequest: false,
                };

                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");

                return state;
            })
            .addCase(getUserInfoThunk.pending, (state) => {
                state = {
                    ...state,
                    userError: false,
                    userRequest: true,
                };

                return state;
            })
            .addCase(getUserInfoThunk.fulfilled, (state, action) => {
                const user = action.payload;
                state = {
                    user: { ...user },
                    userError: false,
                    userRequest: false,
                };

                return state;
            })

            .addCase(changeUserInfoThunk.rejected, (state) => {
                state = {
                    ...state,
                    userError: true,
                    userRequest: true,
                };

                return state;
            })
            .addCase(changeUserInfoThunk.pending, (state) => {
                state = {
                    ...state,
                    userError: false,
                    userRequest: true,
                };

                return state;
            })
            .addCase(changeUserInfoThunk.fulfilled, (state, action) => {
                const user = action.payload;

                state = {
                    user: { ...user },
                    userError: false,
                    userRequest: false,
                };

                return state;
            });
    },
});

type TProfileActionCreators = typeof profileSlice.actions;
export type TProfileActions = ReturnType<TProfileActionCreators[keyof TProfileActionCreators]>
export const { clearUser, setUser } = profileSlice.actions;

export default profileSlice.reducer;
