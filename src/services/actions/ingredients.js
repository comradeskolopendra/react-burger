import { createAsyncThunk } from "@reduxjs/toolkit";
import { request } from "../../helpers/helpers";
import { BASE_URL } from "../../utils/constants";

const getIngredientsThunk = createAsyncThunk(
    "normaapi/ingredients",
    async () => {
        try {
            const { data } = await request(`${BASE_URL}/ingredients`);
            return data;
        } catch (error) {
            console.error(error);
        }
    }
)

export { getIngredientsThunk };