import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import {
    DragIcon,
    ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { setConstructorIngredients } from "../../../services/store/ingredients";
import { ingredientType } from "../../../utils/types";

import { v4 as uuid4 } from "uuid";
import styles from "./ingredients-wrapper.module.css";

const IngredientsWrapper = ({ dispatchPrice, ingredients }) => {
    const dispatch = useDispatch();
    const { constructorIngredients } = useSelector(store => store.ingredients);

    const handleClose = (ingredient) => {
        dispatch(
            setConstructorIngredients(
                [...constructorIngredients].filter((item) => item.uuid !== ingredient.uuid)
            )
        );
        dispatchPrice({ type: "delete", payload: ingredient.price });
    };

    return (
        <ul className={`${styles.ingredientsWrapper}`}>
            {ingredients.map((ingredient) => (
                <li key={uuid4()} className={styles.ingredient}>
                    <div className="mr-2">
                        <DragIcon />
                    </div>
                    <ConstructorElement
                        isLocked={false}
                        price={ingredient.price}
                        handleClose={() => handleClose(ingredient)}
                        thumbnail={ingredient.image}
                        text={ingredient.name}
                    />
                </li>
            ))}
        </ul>
    );
};

IngredientsWrapper.propTypes = {
    dispatchPrice: PropTypes.func.isRequired,
    ingredients: PropTypes.arrayOf(ingredientType)
};

export default IngredientsWrapper;
