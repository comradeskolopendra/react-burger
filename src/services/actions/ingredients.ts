import { createAppAsyncThunk } from ".";
import { request } from "../../helpers/helpers";
import { BASE_URL } from "../../utils/constants";
import type { IIngredient } from "../../utils/types";

const getIngredientsThunk = createAppAsyncThunk<IIngredient[], undefined>(
    "normaapi/ingredients",
    async () => {
        const { data } = await request(`${BASE_URL}/ingredients`);
        return data;
    }
);

export { getIngredientsThunk };
