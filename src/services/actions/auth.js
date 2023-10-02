import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../../utils/constants";
import { getUserInfoThunk } from "./profile";
import { request, setCookie } from "../../helpers/helpers";

const registerUserThunk = createAsyncThunk(
    "normaapi/register",
    async (userInfo, { dispatch }) => {
        const { password, email, name, callback } = userInfo;
        const data = await request(`${BASE_URL}/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ password, email, name }),
        });

        if (data.accessToken) {
            data.accessToken = data.accessToken.split("Bearer ")[1];
        }

        if (data && data.refreshToken) {
            setCookie("refreshToken", data.refreshToken);
            setCookie("accessToken", data.accessToken);
            dispatch(getUserInfoThunk());
            callback();
        }

        return data;
    }
);

const resetPasswordThunk = createAsyncThunk(
    "normaapi/reset-password",
    async (email) => {
        const data = await request(`${BASE_URL}/password-reset`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
        });

        console.log(data);

        return data;
    }
);

const loginUserThunk = createAsyncThunk(
    "normaapi/login",
    async (userInfo, { dispatch }) => {
        const { email, password, callback } = userInfo;
        console.log(userInfo);
        const data = await request(`${BASE_URL}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        if (data.accessToken) {
            data.accessToken = data.accessToken.split("Bearer ")[1];
        }

        if (data && data.refreshToken) {
            setCookie("refreshToken", data.refreshToken);
            setCookie("accessToken", data.accessToken);
            dispatch(getUserInfoThunk());
            callback();
        }

        return { ...data };
    }
);

const refreshTokenThunk = createAsyncThunk(
    "normaapi/refresh-token",
    async (token) => {
        const data = await request(`${BASE_URL}/auth/token`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ token }),
        });

        if (data && data.refreshToken) {
            setCookie("refreshToken", data.refreshToken);
        }

        return data;
    }
);

export {
    registerUserThunk,
    resetPasswordThunk,
    loginUserThunk,
    refreshTokenThunk,
};
