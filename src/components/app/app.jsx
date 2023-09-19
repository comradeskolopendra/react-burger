import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getIngredientsThunk } from "../../services/actions/ingredients";
import { createOrderThunk } from "../../services/actions/order";
import {
    setCurrentIngredient
} from "../../services/store/ingredients";
import { clearOrder } from "../../services/store/order";
import {
    setVisibleIngredient,
    setVisibleOrder,
} from "../../services/store/modal";

import { getStateIngredients, getStateIngredientsError, getStateIngredientsRequest, getStateConstructorIngredients } from '../../selectors/ingredients-selectors';
import { getStateOrderFailed } from '../../selectors/order-selectors';
import { getStateVisibleOrder, getStateVisibleIngredient} from '../../selectors/modal-selectors';

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
    const ingredients = useSelector(getStateIngredients);
    const ingredientsError = useSelector(getStateIngredientsError);
    const ingredientsRequest = useSelector(getStateIngredientsRequest);
    const constructorIngredients = useSelector(getStateConstructorIngredients);
    const orderFailed = useSelector(getStateOrderFailed);
    const visibleOrder = useSelector(getStateVisibleOrder);
    const visibleIngredient = useSelector(getStateVisibleIngredient);

    const handleIngredientClick = (ingredient) => {
        dispatch(setCurrentIngredient(ingredient));
        dispatch(setVisibleIngredient(true));
    };

    const handleOrderClick = async () => {
        const { selectedIngredients, selectedBun } = constructorIngredients;

        if (!selectedBun) {
            return;
        }

        const ingredientIds = [...selectedIngredients, selectedBun].map(
            (element) => element._id
        );

        dispatch(createOrderThunk(ingredientIds));

        if (orderFailed) {
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
        dispatch(clearOrder());
    };

    const modalIngredient = (
        <Modal visible={visibleIngredient} onClose={handleCloseIngredientModal}>
            <IngredientDetails onClose={handleCloseIngredientModal} />
        </Modal>
    );

    const modalOrder = (
        <Modal visible={visibleOrder} onClose={handleCloseOrderModal}>
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
                            <BurgerConstructor onOpenModal={handleOrderClick} />
                        </div>
                    </main>
                )}
            {visibleIngredient && modalIngredient}
            {visibleOrder && modalOrder}
        </>
    );
}

export default App;
