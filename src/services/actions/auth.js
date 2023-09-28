import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../../utils/constants";
import { request, setCookie } from "../../helpers/helpers";

const registerUserThunk = createAsyncThunk(
    "normaapi/register",
    async (userInfo) => {
        const data = await request(`${BASE_URL}/auth/register`, {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({ ...userInfo })
        });

        if (data && data.refreshToken) {
            setCookie("token", data.refreshToken)
        }

        return data;
    }
)

const resetPasswordThunk = createAsyncThunk(
    "normaapi/reset-password",
    async (email) => {
        const data = await request(`${BASE_URL}/password-reset`, {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({ email }),
        });

        if (data && data.success) {
            console.log(data);
        }

        return data;
    }
)

export { registerUserThunk, resetPasswordThunk };