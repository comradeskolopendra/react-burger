import { createAsyncThunk } from "@reduxjs/toolkit";
import { requestWithRefresh } from "../../helpers/helpers";
import { BASE_URL } from "../../utils/constants";
import { setUser } from '../store/profile';

const getUserInfoThunk = createAsyncThunk("normaapi/user", async () => {
    const data = await requestWithRefresh(`${BASE_URL}/auth/user`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("accessToken"),
        },
    });

    return data;
});

const changeUserInfoThunk = createAsyncThunk(
    "normaapi/patchUser",
    async (userInfo, { dispatch }) => {
        const data = await requestWithRefresh(`${BASE_URL}/auth/user`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: localStorage.getItem("accessToken"),
            },
            body: JSON.stringify(userInfo),
        });

        const { user } = data;

        if (data && data.success) {
            dispatch(setUser(user))
        }

        return user;
    }
);

export { getUserInfoThunk, changeUserInfoThunk };
