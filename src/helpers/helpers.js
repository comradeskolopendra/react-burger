import { BASE_URL } from "../utils/constants";

const checkResponse = (res) =>
    res.ok ? res.json() : new Error(`Ошибка: ${res.status}`);

const request = (url, options = {}) => fetch(url, options).then(checkResponse);

const getIngredients = async (updateState) => {
    updateState((prevState) => ({ ...prevState, isLoading: true }));
    try {
        const { data } = await request(`${BASE_URL}/ingredients`);
        updateState((prevState) => ({ ...prevState, data }));
        console.log(data);
    } catch (error) {
        updateState((prevState) => ({ ...prevState, hasError: true }));
        console.error(error);
    } finally {
        updateState((prevState) => ({ ...prevState, isLoading: false }));
    }
};

const createOrder = async (updateState, ingredientsIds) => {
    updateState((prevState) => ({ ...prevState, isLoading: true }));
    try {
        console.log(ingredientsIds);
        const data = await request(`${BASE_URL}/orders`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify({ ingredients: ingredientsIds }),
        });
        updateState((prevState) => ({ ...prevState, data }));
    } catch (error) {
        updateState((prevState) => ({ ...prevState, hasError: true }));
    } finally {
        updateState((prevState) => ({ ...prevState, isLoading: false }));
    }
};

export { getIngredients, createOrder };
