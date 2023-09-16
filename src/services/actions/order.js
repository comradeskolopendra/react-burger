import { createAsyncThunk } from "@reduxjs/toolkit";
import { createOrder } from "../../helpers/helpers";

const createOrderThunk = createAsyncThunk(
    "normaapi/order",
    async (ingredientsIds) => {
        console.log(ingredientsIds)
        const order = await createOrder(ingredientsIds);
        return order;
    }
);

export { createOrderThunk }