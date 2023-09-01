import AppHeader from "../app-header/app-header";
import { URL_API } from "../../utils/data";

import "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./app.module.css";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { useEffect, useState } from "react";

function App() {
    const [ingredients, setIngredients] = useState({
        hasError: false,
        data: [],
        isLoading: false,
    });

    const getIngredients = async () => {
        setIngredients({ ...ingredients, isLoading: true });
        console.log(ingredients);
        try {
            const response = await fetch(URL_API);

            if (!response.ok) throw new Error("fetch error");

            const { data } = await response.json();
            console.log(data, response.ok);

            setIngredients({ ...ingredients, data });
        } catch (error) {
            setIngredients({ ...ingredients, hasError: true });
            console.error(error);
        } finally {
            setIngredients({ ...ingredients, isLoading: false });
        }
    };

    useEffect(() => {
        getIngredients();
    }, []);

    useEffect(() => {
        console.log(ingredients)
    }, [ingredients]);

    const buns = ingredients.data.filter((element) => element.type === "bun");
    const sauces = ingredients.data.filter(
        (element) => element.type === "sauce"
    );
    const mains = ingredients.data.filter((element) => element.type === "main");
    return (
        <div>
            <AppHeader />
            {ingredients.isLoading && "Идет загрузка"}
            {ingredients.hasError && "Что-то пошло не так!"}
            {ingredients.data.length !== 0 &&
                !ingredients.hasError &&
                !ingredients.isLoading && (
                    <main className={styles.main}>
                        <h1 className="text text_type_main-large mt-10 mb-5">
                            Соберите бургер
                        </h1>

                        <div className={styles.wrapper}>
                            <BurgerIngredients
                                buns={buns}
                                sauces={sauces}
                                mains={mains}
                            />
                            <BurgerConstructor
                                ingredients={[...mains, ...sauces]}
                            />
                        </div>
                    </main>
                )}
        </div>
    );
}

export default App;
