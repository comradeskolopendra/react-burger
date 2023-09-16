import { createAsyncThunk } from "@reduxjs/toolkit";
import { getIngredients } from "../../helpers/helpers";

const getIngredientsThunk = createAsyncThunk(
    "normaapi/ingredients",
    async () => {
        const response = await getIngredients();
        return response
    }
)

export { getIngredientsThunk };