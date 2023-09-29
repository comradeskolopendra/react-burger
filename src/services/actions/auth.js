import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../../utils/constants";
import { request, setCookie } from "../../helpers/helpers";

const registerUserThunk = createAsyncThunk(
    "normaapi/register",
    async (userInfo) => {
        const data = await request(`${BASE_URL}/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...userInfo }),
        });

        if (data && data.refreshToken) {
            setCookie("token", data.refreshToken);
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

        return data;
    }
);

const loginUserThunk = createAsyncThunk("normaapi/login", async (userInfo) => {
    const { email, password, callback } = userInfo;
    const data = await request(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    });

    if (typeof callback === "function" && data) {
        callback();
    }

    return data;
});

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
            setCookie("token", data.refreshToken);
            // callback();
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
