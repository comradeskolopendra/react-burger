import { useMemo } from "react";
import PropTypes from "prop-types";
import { useDrag } from "react-dnd";
import { useSelector } from "react-redux";
import { getStateConstructorIngredients } from '../../../../selectors/ingredients-selectors';

import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";

import { ingredientType } from '../../../../utils/types';
import styles from "./ingredient-card.module.css";

const IngredientCard = ({ ingredient, onClick }) => {
    const constructorIngredients = useSelector(getStateConstructorIngredients);
    const { selectedIngredients, selectedBun } = constructorIngredients;

    const [_, ingredientRef] = useDrag({
        type: ingredient.type === "bun" ? "bun" : "ingredients",
        item: { ingredient }
    })

    const count = useMemo(() => {
        return [...selectedIngredients, selectedBun].filter(
            (element) => element?._id === ingredient?._id
        ).length;
    }, [constructorIngredients]);

    return (
        <div key={ingredient._id} ref={ingredientRef} onClick={() => onClick(ingredient)} className={styles.card}>
            <img
                src={ingredient.image}
                className={`${styles.ingredientImage} pl-4 pr-4`}
                alt={ingredient.name}
            />
            <div className={`${styles.price} pt-2 pb-2`}>
                <p className="text text_type_digits-default">
                    {ingredient.price}
                </p>
                <CurrencyIcon type="primary" />
            </div>
            <p className="text text_type_main-default">{ingredient.name}</p>
            <Counter count={count} size="default" />
        </div>
    );
};

IngredientCard.propTypes = {
    ingredient: ingredientType,
    onClick: PropTypes.func.isRequired,
};

export default IngredientCard;