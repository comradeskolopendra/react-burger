import { createAsyncThunk } from "@reduxjs/toolkit";
import { request } from "../../helpers/helpers";
import { BASE_URL } from "../../utils/constants";
import { clearConstructor } from '../store/constructor';

const createOrderThunk = createAsyncThunk(
    "normaapi/order",
    async (ingredientsIds, { dispatch }) => {
        const data = await request(`${BASE_URL}/orders`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify({ ingredients: ingredientsIds }),
        });

        dispatch(clearConstructor());

        return data;
    }
);

export { createOrderThunk }