import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
    changePasswordThunk,
    loginUserThunk,
    logoutUserThunk,
    registerUserThunk,
    resetPasswordThunk,
} from "../actions/auth";

export interface IAuthState {
    isRequest: boolean;
    isError: boolean;
    isLoaded: boolean;
    isAuthChecked: boolean;
    isPasswordSuccessfullyChanged: boolean;
}

const initialState: IAuthState = {
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
        setAuthChecked(state, action: PayloadAction<boolean>) {
            state = {
                ...state,
                isAuthChecked: action.payload,
            };

            return state;
        },
        removeSuccesfullyPasswordChange(state) {
            state = {
                ...state,
                isPasswordSuccessfullyChanged: false
            }

            return state;
        }
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
            .addCase(registerUserThunk.fulfilled, (state) => {
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
            .addCase(loginUserThunk.fulfilled, (state) => {
                state = {
                    ...state,
                    isLoaded: true,
                    isError: false,
                    isRequest: false,
                };

                return state;
            })
            .addCase(changePasswordThunk.rejected, (state) => {
                state = {
                    ...state,
                    isPasswordSuccessfullyChanged: false,
                    isRequest: false,
                    isError: true,
                };

                return state;
            })
            .addCase(changePasswordThunk.pending, (state) => {
                state = {
                    ...state,
                    isPasswordSuccessfullyChanged: false,
                    isRequest: true,
                    isError: false,
                };

                return state;
            })
            .addCase(changePasswordThunk.fulfilled, (state) => {
                state = {
                    ...state,
                    isPasswordSuccessfullyChanged: true,
                    isRequest: false,
                    isError: false,
                };

                return state;
            })

            .addCase(logoutUserThunk.fulfilled, (state) => {
                state = {
                    ...state,
                    isError: false,
                    isLoaded: false,
                };

                return state;
            })
    },
});


type TAuthActionCreators = typeof authSlice.actions;
export type TAuthActions = ReturnType<TAuthActionCreators[keyof TAuthActionCreators]>
export const { setAuthChecked, removeSuccesfullyPasswordChange } = authSlice.actions;

export default authSlice.reducer;
