import { useDispatch, useSelector } from "react-redux";

import {
    getStateCurrentIngredient,
    getStateIngredients,
    getStateIngredientsError,
    getStateIngredientsRequest,
} from "../../selectors/ingredients-selectors";
import {
    getStateVisibleIngredient,
    getStateVisibleOrder,
} from "../../selectors/modal-selectors";
import { getStateSelectedBun, getStateSelectedIngredients } from "../../selectors/constructor-selectors";
import { getStateOrderFailed } from '../../selectors/order-selectors';

import { createOrderThunk } from "../../services/actions/order";

import { setCurrentIngredient } from "../../services/store/ingredients";
import {
    setVisibleIngredient,
    setVisibleOrder,
} from "../../services/store/modal";

import BurgerIngredients from './burger-ingredients/burger-ingredients';
import BurgerConstructor from './burger-constructor/burger-constructor';
import Modal from '../../components/modal/modal';
import IngredientDetails from './ingredient-details/ingredient-details';
import OrderDetails from './order-details/order-detail';

import styles from "./main.module.css";

const MainPage = () => {
    const dispatch = useDispatch();

    const ingredients = useSelector(getStateIngredients);
    const ingredientsRequest = useSelector(getStateIngredientsRequest);
    const ingredientsError = useSelector(getStateIngredientsError);

    const visibleIngredient = useSelector(getStateVisibleIngredient);
    const visibleOrder = useSelector(getStateVisibleOrder);
    const currentIngredient = useSelector(getStateCurrentIngredient)

    const selectedBun = useSelector(getStateSelectedBun);
    const selectedIngredients = useSelector(getStateSelectedIngredients);
    
    const orderFailed = useSelector(getStateOrderFailed);

    const handleIngredientClick = (ingredient) => {
        dispatch(setCurrentIngredient(ingredient));
        dispatch(setVisibleIngredient(true));
    };

    const handleOrderClick = async () => {
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
    };

    const modalIngredient = (
        <Modal
            ingredient={currentIngredient}
            visible={visibleIngredient}
            onClose={handleCloseIngredientModal}
        >
            <IngredientDetails onClose={handleCloseIngredientModal} />
        </Modal>
    );

    const modalOrder = (
        <Modal visible={visibleOrder} onClose={handleCloseOrderModal}>
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
};

export default MainPage;
