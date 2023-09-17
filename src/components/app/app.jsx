import { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getIngredientsThunk } from "../../services/actions/ingredients";
import { setCurrentIngredient, setPrice } from "../../services/store/ingredients";
import { clearOrder } from "../../services/store/order";
import { createOrderThunk } from "../../services/actions/order";

import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import IngredientDetails from "../ingredient-details/ingredient-details";
import OrderDetails from "../order-details/order-detail";
import Modal from "../modal/modal";

import "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./app.module.css";


function App() {
    const [visibleIngredient, setVisibleIngredient] = useState(false);
    const [visibleOrder, setVisibleOrder] = useState(false);
    const dispatch = useDispatch();
    const { ingredients, ingredientsRequest, ingredientsError, constructorIngredients } = useSelector(store => store.ingredients);
    const { orderFailed } = useSelector(store => store.order);
    const price = useMemo(() => {
        return constructorIngredients.reduce((prev, cur) => {
            if (cur.type === "bun") {
                prev += +cur.price * 2;
            } else {
                prev += +cur.price;
            }

            return prev;
        }, 0);
    }, [constructorIngredients])

    const handleIngredientClick = (ingredient) => {
        dispatch(setCurrentIngredient(ingredient));
        setVisibleIngredient(true);
    };

    const handleOrderClick = async () => {
        const ingredientIds = constructorIngredients.map((element) => element._id);
        dispatch(createOrderThunk(ingredientIds));
        if (orderFailed || constructorIngredients.length === 0) {
            return;
        }
        return setVisibleOrder(true);
    };

    const handleCloseIngredientModal = () => {
        setVisibleIngredient(false);
        dispatch(setCurrentIngredient(null));
    };

    const handleCloseOrderModal = () => {
        setVisibleOrder(false)
        dispatch(clearOrder())
    }

    const modalIngredient = (
        <Modal
            visible={visibleIngredient}
            onClose={handleCloseIngredientModal}
        >
            <IngredientDetails changeVisibility={setVisibleIngredient} />
        </Modal>
    );

    const modalOrder = (
        <Modal visible={visibleOrder} onClose={handleCloseOrderModal}>
            <OrderDetails changeVisibility={setVisibleOrder} />
        </Modal>
    );

    useEffect(() => {
        dispatch(getIngredientsThunk());
    }, []);

    useEffect(() => {
        dispatch(setPrice(price));
    }, [price])

    return (
        <>
            <AppHeader />
            {ingredientsRequest && "Идет загрузка"}
            {ingredientsError && "Что-то пошло не так!"}
            {ingredients.length !== 0 &&
                !ingredientsRequest &&
                !ingredientsError && (
                    <main className={styles.main}>
                        <h1 className="text text_type_main-large mt-10 mb-5">
                            Соберите бургер
                        </h1>

                        <div className={styles.wrapper}>
                            <BurgerIngredients
                                onOpenModal={handleIngredientClick}
                            />
                            <BurgerConstructor
                                onOpenModal={handleOrderClick}
                            />
                        </div>
                    </main>
                )}
            {visibleIngredient && modalIngredient}
            {visibleOrder && modalOrder}
        </>
    );
}

export default App;