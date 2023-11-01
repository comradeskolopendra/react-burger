import { createAsyncThunk } from "@reduxjs/toolkit";
import { request } from "../../helpers/helpers";
import { BASE_URL } from "../../utils/constants";
import { clearConstructor } from "../store/constructor";
import type { IOrder } from "../../utils/types";
import type { AppDispatch } from '../types';

const createOrderThunk = createAsyncThunk<IOrder, string[], {dispatch: AppDispatch}>(
    "normaapi/order",
    async (ingredientsIds, { dispatch }) => {
        const data = await request(`${BASE_URL}/orders`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify({ ingredients: ingredientsIds }),
        });

        const { order } = data;

        dispatch(clearConstructor());

        return order;
    }
);

export { createOrderThunk };
