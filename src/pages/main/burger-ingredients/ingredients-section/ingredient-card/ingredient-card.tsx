import { FC } from "react";
import { useLocation } from "react-router-dom";
import { useMemo } from "react"
import { useDrag } from "react-dnd";

import { getStateSelectedBun, getStateSelectedIngredients } from '../../../../../selectors/constructor-selectors';

import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";

import { IIngredient, TConstructorIngredient } from '../../../../../utils/types';
import styles from "./ingredient-card.module.css";
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';

interface IIngredientCard {
    ingredient: IIngredient;
    onClick: (...args: any) => any;
}

const IngredientCard: FC<IIngredientCard> = ({ ingredient, onClick }) => {
    const location = useLocation();

    const selectedIngredients: TConstructorIngredient[] = useSelector(getStateSelectedIngredients);
    const selectedBun: IIngredient = useSelector(getStateSelectedBun);

    const [_, ingredientRef] = useDrag({
        type: ingredient.type === "bun" ? "bun" : "ingredients",
        item: ingredient
    })

    const count = useMemo(() => {
        return [...selectedIngredients, selectedBun].filter((element) => element?._id === ingredient?._id).length
    }, [selectedBun, selectedIngredients])

    return (
        <Link
            to={`/ingredients/${ingredient._id}`}
            key={ingredient._id}
            ref={ingredientRef}
            onClick={() => onClick(ingredient)}
            className={styles.card}
            state={{ background: location }}
        >
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
        </Link>
    );
};

export default IngredientCard;