import { createAsyncThunk } from "@reduxjs/toolkit";
import { getCookie, request } from "../../helpers/helpers";
import { BASE_URL } from "../../utils/constants";

const getUserInfoThunk = createAsyncThunk("normaapi/user", async () => {
    const data = await request(`${BASE_URL}/auth/user`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + getCookie("accessToken"),
        },
    });

    return data;
});

const changeUserInfoThunk = createAsyncThunk(
    "normaapi/patchUser",
    async (userInfo) => {
        const data = await request(`${BASE_URL}/auth/user`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + getCookie("accessToken"),
            },
            body: JSON.stringify({ ...userInfo }),
        });

        return data;
    }
);

export { getUserInfoThunk, changeUserInfoThunk };
