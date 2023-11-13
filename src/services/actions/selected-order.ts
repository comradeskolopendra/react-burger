import { createAppAsyncThunk } from ".";
import { request } from "../../helpers/helpers";
import { BASE_URL } from "../../utils/constants";
import { IGetOrderByNumber } from '../types';

const getOrderByNumber = createAppAsyncThunk<IGetOrderByNumber, number | undefined>(
    "normaapi/order-number",
    async (number, {rejectWithValue}) => {

        if (number === undefined) {
            console.log("NUMBER = UNDEFINED");
            rejectWithValue("NUMBER = UNDEFINED");
        }

        if (isNaN(number!)) {
            console.log("NUMBER НЕ ПЕРЕДАН");
            rejectWithValue("NUMBER НЕ ПЕРЕДАН");
        }
    
        const data = await request(`${BASE_URL}/orders/${number}`);

        return data;
    }
);

export { getOrderByNumber };
