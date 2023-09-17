import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getIngredientsThunk } from "../../services/actions/ingredients";
import { setCurrentIngredient } from "../../services/store/ingredients";
import { clearOrder } from "../../services/store/order";
import { setVisibleIngredient, setVisibleOrder } from "../../services/store/modal";
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
    const dispatch = useDispatch();
    const { ingredients, ingredientsRequest, ingredientsError, constructorIngredients } = useSelector(store => store.ingredients);
    const { orderFailed } = useSelector(store => store.order);
    const { visibleOrder, visibleIngredient } = useSelector(store => store.modal)

    const handleIngredientClick = (ingredient) => {
        dispatch(setCurrentIngredient(ingredient));
        dispatch(setVisibleIngredient(true));
    };

    const handleOrderClick = async () => {
        const ingredientIds = constructorIngredients.map((element) => element._id);
        dispatch(createOrderThunk(ingredientIds));
        if (orderFailed || constructorIngredients.length === 0) {
            return;
        }
        return dispatch(setVisibleOrder(true));
    };

    const handleCloseIngredientModal = () => {
        dispatch(setVisibleIngredient(false));
        dispatch(setCurrentIngredient(null));
    };

    const handleCloseOrderModal = () => {
        dispatch(setVisibleOrder(false));
        dispatch(clearOrder())
    }

    const modalIngredient = (
        <Modal
            visible={visibleIngredient}
            onClose={handleCloseIngredientModal}
        >
            <IngredientDetails onClose={handleCloseIngredientModal} />
        </Modal>
    );

    const modalOrder = (
        <Modal
            visible={visibleOrder}
            onClose={handleCloseOrderModal}
        >
            <OrderDetails onClose={handleCloseOrderModal} />
        </Modal>
    );

    useEffect(() => {
        dispatch(getIngredientsThunk());
    }, []);

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