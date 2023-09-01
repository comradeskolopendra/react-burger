import { useEffect, useRef, useState } from "react";

import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import Modal from "../modal/modal";

import { getIngredients } from "../../helpers/helpers";

import "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./app.module.css";
import IngredientDetails from "../ingredient-details/ingredient-details";

function App() {
    const [visibleIngredient, setVisibleIngredient] = useState(false);
    const [currentIngredient, setCurrentIngredient] = useState(null);
    const bodyRef = useRef(document.body);
    const [ingredients, setIngredients] = useState({
        hasError: false,
        data: [],
        isLoading: false,
    });

    const handleIngredientClick = (ingredient) => {
        setCurrentIngredient(ingredient);
        setVisibleIngredient(true);
    };

    useEffect(() => {
        getIngredients(setIngredients);
    }, []);

    useEffect(() => {
        if (visibleIngredient) {
            bodyRef.current.style.overflow = "hidden";
        } else {
            bodyRef.current.style.overflow = "";
            setCurrentIngredient(null);
        }
    }, [visibleIngredient]);

    const modalIngredient = (
        <Modal handleBackgroundClick={() => setVisibleIngredient(false)}>
            <IngredientDetails
                ingredient={currentIngredient}
                changeVisibility={setVisibleIngredient}
            />
        </Modal>
    );

    const modalOrder = (
        <Modal handleBackgroundClick={() => setVisibleIngredient(false)}>
            <IngredientDetails
                ingredient={currentIngredient}
                changeVisibility={setVisibleIngredient}
            />
        </Modal>
    );

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
                                handleIngredientClick={handleIngredientClick}
                                ingredients={ingredients.data}
                            />
                            <BurgerConstructor
                                changeModalVisibility={setVisibleIngredient}
                                ingredients={ingredients.data.filter(
                                    (ingredient) => ingredient.type !== "bun"
                                )}
                            />
                        </div>
                    </main>
                )}
            {visibleIngredient && modalIngredient}
        </div>
    );
}

export default App;
