import { URL_API, URL_ORDER } from "../utils/constants";

const getIngredients = async (updateState) => {
    updateState((prevState) => ({ ...prevState, isLoading: true }));
    try {
        const response = await fetch(URL_API);

        if (!response.ok) throw new Error("fetch get ingredients error");

        const { data } = await response.json();

        updateState((prevState) => ({ ...prevState, data }));
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
        console.log(ingredientsIds)
        const response = await fetch(URL_ORDER, {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify({ ingredients: ingredientsIds })
        });

        if (!response.ok) throw new Error("fetch create order error");

        const data = await response.json();

        updateState((prevState) => ({ ...prevState, data }));
    } catch (error) {
        updateState((prevState) => ({ ...prevState, hasError: true }));
    } finally {
        updateState((prevState) => ({ ...prevState, isLoading: false }));
    }
};

export { getIngredients, createOrder };
