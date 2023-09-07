import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import IngredientDetails from "../ingredient-details/ingredient-details";
import OrderDetails from "../order-details/order-detail";
import Modal from "../modal/modal";

import { createOrder, getIngredients } from "../../helpers/helpers";
import { BurgerContext, ModalContext } from "../../context/context";

import "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./app.module.css";

function App() {
    const [visibleIngredient, setVisibleIngredient] = useState(false);
    const [visibleOrder, setVisibleOrder] = useState(false);

    const [currentIngredient, setCurrentIngredient] = useState(null);
    const [constructorData, setConstructorData] = useState([]);

    const [ingredients, setIngredients] = useState({
        hasError: false,
        data: [],
        isLoading: false,
    });

    const [order, setOrder] = useState({
        hasError: false,
        data: [],
        isLoading: false,
    });

    const handleIngredientClick = (ingredient) => {
        setCurrentIngredient({...ingredient});
        setVisibleIngredient(true);
    };

    const handleOrderClick = async () => {
        const ingredientIds = constructorData.map((element) => element._id);
        await createOrder(setOrder, ingredientIds);
        if (order.hasError || constructorData.length === 0) {
            return;
        }
        return setVisibleOrder(true);
    };

    const handleCloseIngredientModal = () => {
        setVisibleIngredient(false);
        setCurrentIngredient(null);
    };

    useEffect(() => {
        getIngredients(setIngredients);
    }, []);

    const modalIngredient = (
        <Modal
            visible={visibleIngredient}
            onClose={handleCloseIngredientModal}
        >
            <IngredientDetails changeVisibility={setVisibleIngredient} />
        </Modal>
    );

    const modalOrder = (
        <Modal visible={visibleOrder} onClose={() => setVisibleOrder(false)}>
            <OrderDetails changeVisibility={setVisibleOrder} />
        </Modal>
    );

    return (
        <>
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
                            <BurgerContext.Provider
                                value={{
                                    ingredients: ingredients.data,
                                    constructorData,
                                    setConstructorData,
                                    currentIngredient,
                                    setCurrentIngredient,
                                }}
                            >
                                <BurgerIngredients
                                    onOpenModal={handleIngredientClick}
                                />
                                <BurgerConstructor
                                    onOpenModal={handleOrderClick}
                                />
                            </BurgerContext.Provider>
                        </div>
                    </main>
                )}
            <ModalContext.Provider value={{ order, currentIngredient }}>
                {visibleIngredient && modalIngredient}
                {visibleOrder && modalOrder}
            </ModalContext.Provider>
        </>
    );
}

export default App;
