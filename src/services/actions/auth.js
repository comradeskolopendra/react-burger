import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../../utils/constants";
import { getUserInfoThunk } from "./profile";
import { request, requestWithRefresh } from "../../helpers/helpers";

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

        if (data && data.refreshToken) {
            localStorage.setItem("refreshToken", data.refreshToken);
            localStorage.setItem("accessToken", data.accessToken);
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

        return data;
    }
);

const loginUserThunk = createAsyncThunk(
    "normaapi/login",
    async (userInfo, { dispatch }) => {
        const { email, password } = userInfo;
        const data = await request(`${BASE_URL}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        if (data && data.refreshToken) {
            localStorage.setItem("refreshToken", data.refreshToken);
            localStorage.setItem("accessToken", data.accessToken);
            dispatch(getUserInfoThunk());
        }

        return data;
    }
);

const logoutUserThunk = createAsyncThunk("normaapi/logout", async () => {
    const data = await requestWithRefresh(`${BASE_URL}/auth/logout`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ token: localStorage.getItem("refreshToken") })
    });

    if (data.success) {
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("accessToken");
    }

    return data;
})

export {
    registerUserThunk,
    resetPasswordThunk,
    loginUserThunk,
    logoutUserThunk
};
