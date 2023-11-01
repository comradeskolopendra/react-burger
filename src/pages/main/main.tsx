import { FC } from "react"
import { useAppDispatch, useAppSelector } from '../../services/hooks/hooks';

import {
    getStateIngredients,
    getStateIngredientsError,
    getStateIngredientsRequest,
} from "../../selectors/ingredients-selectors";
import { getStateVisibleOrder } from "../../selectors/modal-selectors";
import {
    getStateSelectedBun,
    getStateSelectedIngredients,
} from "../../selectors/constructor-selectors";
import { getStateOrderFailed } from "../../selectors/order-selectors";

import { createOrderThunk } from "../../services/actions/order";

import { setVisibleOrder } from "../../services/store/modal";

import BurgerIngredients from "./burger-ingredients/burger-ingredients";
import BurgerConstructor from "./burger-constructor/burger-constructor";
import Modal from "../../components/modal/modal";
import OrderDetails from "./order-details/order-detail";

import styles from "./main.module.css";
import { IIngredient, TConstructorIngredient } from "../../utils/types";

const MainPage: FC = () => {
    const dispatch = useAppDispatch();

    const ingredients = useAppSelector(getStateIngredients);
    const ingredientsRequest = useAppSelector(getStateIngredientsRequest);
    const ingredientsError = useAppSelector(getStateIngredientsError);

    const visibleOrder = useAppSelector(getStateVisibleOrder);

    const selectedBun = useAppSelector(getStateSelectedBun);
    const selectedIngredients = useAppSelector(getStateSelectedIngredients);

    const orderFailed = useAppSelector(getStateOrderFailed);

    const handleOrderClick = () => {
        const ingredientIds = [...selectedIngredients, selectedBun].map(
            (element: TConstructorIngredient | IIngredient | null) => element!._id
        );

        // @ts-ignore
        dispatch(createOrderThunk(ingredientIds));

        if (orderFailed) {
            return;
        }

        dispatch(setVisibleOrder(true));
    };

    const handleCloseOrderModal = () => {
        dispatch(setVisibleOrder(false));
    };

    const modalOrder = (
        <Modal onClose={handleCloseOrderModal}>
            <OrderDetails onClose={handleCloseOrderModal} />
        </Modal>
    );

    return (
        <>
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
                            <BurgerIngredients />
                            <BurgerConstructor onOpenModal={handleOrderClick} />
                        </div>
                    </main>
                )}
            {visibleOrder && modalOrder}
        </>
    );
};

export default MainPage;
