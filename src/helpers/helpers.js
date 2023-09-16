import { BASE_URL } from "../utils/constants";

const checkResponse = (res) =>
    res.ok ? res.json() : new Error(`Ошибка: ${res.status}`);

const request = (url, options = {}) => fetch(url, options).then(checkResponse);

const getIngredients = async () => {
    try {
        const { data } = await request(`${BASE_URL}/ingredients`);
        return data;
    } catch (error) {
        console.error(error);
    }
};

const createOrder = async (ingredientsIds) => {
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
};

export { getIngredients, createOrder };