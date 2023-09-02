import { useEffect, useMemo, useRef, useState } from "react";

import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import IngredientDetails from "../ingredient-details/ingredient-details";
import OrderDetails from "../order-details/order-detail";
import Modal from "../modal/modal";

import { getIngredients } from "../../helpers/helpers";

import "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./app.module.css";

function App() {
    const [visibleIngredient, setVisibleIngredient] = useState(false);
    const [visibleOrder, setVisibleOrder] = useState(false);

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

    const constructorIngredients = useMemo(() => {
        return ingredients.data.filter(
            (ingredient) => ingredient.type !== "bun"
        )
    }, [ingredients])

    useEffect(() => {
        getIngredients(setIngredients);
    }, []);

    const modalIngredient = (
        <Modal visible={visibleIngredient} body={bodyRef.current} onClose={() => setVisibleIngredient(false)}>
            <IngredientDetails
                ingredient={currentIngredient}
                changeVisibility={setVisibleIngredient}
            />
        </Modal>
    );

    const modalOrder = (
        <Modal visible={visibleOrder} body={bodyRef.current} onClose={() => setVisibleOrder(false)}>
            <OrderDetails changeVisibility={setVisibleOrder} />
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
                                handleOrderClick={setVisibleOrder}
                                ingredients={constructorIngredients}
                            />
                        </div>
                    </main>
                )}
            {visibleIngredient && modalIngredient}
            {visibleOrder && modalOrder}
        </div>
    );
}

export default App;
