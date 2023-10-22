import { FC } from "react"
import { useDispatch, useSelector } from "react-redux";

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
    const dispatch = useDispatch();

    const ingredients: IIngredient[] = useSelector(getStateIngredients);
    const ingredientsRequest: boolean = useSelector(getStateIngredientsRequest);
    const ingredientsError: boolean = useSelector(getStateIngredientsError);

    const visibleOrder: boolean = useSelector(getStateVisibleOrder);

    const selectedBun: IIngredient = useSelector(getStateSelectedBun);
    const selectedIngredients: TConstructorIngredient[] = useSelector(getStateSelectedIngredients);

    const orderFailed: boolean = useSelector(getStateOrderFailed);

    const handleOrderClick = () => {
        const ingredientIds = [...selectedIngredients, selectedBun].map(
            (element: IIngredient | TConstructorIngredient) => element._id
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
