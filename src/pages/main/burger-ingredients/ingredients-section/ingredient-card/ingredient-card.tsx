import { FC } from "react";
import { useLocation } from "react-router-dom";
import { useMemo } from "react"
import { useDrag } from "react-dnd";

import { getStateSelectedBun, getStateSelectedIngredients } from '../../../../../selectors/constructor-selectors';

import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";

import { IIngredient } from '../../../../../utils/types';
import styles from "./ingredient-card.module.css";
import { useAppSelector } from '../../../../../services/hooks/hooks';
import { Link } from 'react-router-dom';

interface IIngredientCard {
    ingredient: IIngredient;
}

const IngredientCard: FC<IIngredientCard> = ({ ingredient }) => {
    const location = useLocation();

    const selectedIngredients = useAppSelector(getStateSelectedIngredients);
    const selectedBun = useAppSelector(getStateSelectedBun);

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
            className={styles.card}
            state={{ background: location }}
            data-testid="ingredients"
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