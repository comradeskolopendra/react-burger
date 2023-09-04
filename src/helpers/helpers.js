import { URL_API } from "../utils/constants";

const getIngredients = async (updateState) => {
    updateState((prevState) => ({ ...prevState, isLoading: true }));
    try {
        const response = await fetch(URL_API);

        if (!response.ok) throw new Error("fetch error");

        const { data } = await response.json();

        updateState((prevState) => ({ ...prevState, data }));
    } catch (error) {
        updateState((prevState) => ({ ...prevState, hasError: true }));
        console.error(error);
    } finally {
        updateState((prevState) => ({ ...prevState, isLoading: false }));
    }
};

export { getIngredients };
