import PropTypes from "prop-types";
import { useMemo, useEffect } from "react"
import { useDrag } from "react-dnd";

import { getStateSelectedBun, getStateSelectedIngredients } from "../../../../selectors/constructor-selectors";

import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";

import { ingredientType } from '../../../../utils/types';
import styles from "./ingredient-card.module.css";
import { useSelector } from "react-redux";

const IngredientCard = ({ ingredient, onClick }) => {

    const selectedIngredients = useSelector(getStateSelectedIngredients);
    const selectedBun = useSelector(getStateSelectedBun);

    const [_, ingredientRef] = useDrag({
        type: ingredient.type === "bun" ? "bun" : "ingredients",
        item: { ingredient }
    })

    const count = useMemo(() => {
        return [...selectedIngredients, selectedBun].filter(element => element?._id === ingredient?._id).length
    }, [selectedBun, selectedIngredients])

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