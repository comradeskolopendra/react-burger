import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../../utils/constants";
import { request } from "../../helpers/helpers";
import { clearUser, setUser } from '../store/profile';
import type { AppDispatch } from "../types";
import { IUser } from "../../utils/types";

type TUserInfo = {
    name: string;
    email: string;
    password: string;
};

type TLoginUser = Omit<TUserInfo, "name">;

type TAuthUserData = {
    success: boolean;
    user: IUser;
    accessToken: string;
    refreshToken: string;
}

type TChangePasswordData = {
    password: string;
    token: string;
}


const registerUserThunk = createAsyncThunk<TAuthUserData, TUserInfo, { dispatch: AppDispatch }>(
    "normaapi/register",
    async (userInfo, { dispatch }) => {
        const data = await request(`${BASE_URL}/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userInfo),
        });

        console.log(data, userInfo)

        if (data && data.refreshToken) {
            localStorage.setItem("refreshToken", data.refreshToken);
            localStorage.setItem("accessToken", data.accessToken);
            dispatch(setUser(data));
        }

        return data;
    }
);

const resetPasswordThunk = createAsyncThunk<unknown, string>(
    "normaapi/reset-password",
    async (email) => {
        await request(`${BASE_URL}/password-reset`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
        });
    }
);

const changePasswordThunk = createAsyncThunk<unknown, TChangePasswordData>("normaapi/reset-password/reset",
    async (resetInfo) => {
        await request(`${BASE_URL}/password-reset/reset`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(resetInfo)
        })
    }
)

const loginUserThunk = createAsyncThunk<TAuthUserData, TLoginUser, { dispatch: AppDispatch }>(
    "normaapi/login",
    async (userInfo, { dispatch }) => {
        const data = await request(`${BASE_URL}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userInfo),
        });

        console.log(userInfo, data)

        if (data && data.refreshToken) {
            localStorage.setItem("refreshToken", data.refreshToken);
            localStorage.setItem("accessToken", data.accessToken);
            dispatch(setUser(data));
        }

        return data;
    }
);

const logoutUserThunk = createAsyncThunk<unknown, unknown, { dispatch: AppDispatch }>(
    "normaapi/logout",
    async (_, { dispatch }) => {
        const data = await request(`${BASE_URL}/auth/logout`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                token: localStorage.getItem("refreshToken"),
            }),
        });

        if (data.success) {
            localStorage.removeItem("refreshToken");
            localStorage.removeItem("accessToken");
            dispatch(clearUser());
        }
    }
);

export {
    registerUserThunk,
    resetPasswordThunk,
    loginUserThunk,
    logoutUserThunk,
    changePasswordThunk,
};
