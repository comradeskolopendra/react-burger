import { createAsyncThunk } from "@reduxjs/toolkit";
import { request } from "../../helpers/helpers";
import { BASE_URL } from "../../utils/constants";

const createOrderThunk = createAsyncThunk(
    "normaapi/order",
    async (ingredientsIds) => {
        try {
            const data = await request(`${BASE_URL}/orders`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json;charset=utf-8",
                },
                body: JSON.stringify({ ingredients: ingredientsIds }),
            });
            return data;
        } catch (error) {
            console.error(error)
        }
    }
);

export { createOrderThunk }