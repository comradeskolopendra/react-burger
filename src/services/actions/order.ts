import { createAppAsyncThunk } from ".";
import { request } from "../../helpers/helpers";
import { BASE_URL } from "../../utils/constants";
import { clearConstructor } from "../store/constructor";
import type { IOrder } from "../../utils/types";

const createOrderThunk = createAppAsyncThunk<IOrder, string[]>(
    "normaapi/order",
    async (ingredientsIds, { dispatch }) => {
        const data = await request(`${BASE_URL}/orders`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
                "Authorization": localStorage.getItem("accessToken")
            },
            body: JSON.stringify({ ingredients: ingredientsIds }),
        });

        const { order } = data;

        console.log(data, order)

        dispatch(clearConstructor());

        return order;
    }
);

export { createOrderThunk };
