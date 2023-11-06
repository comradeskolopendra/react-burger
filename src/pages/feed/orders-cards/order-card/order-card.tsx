import { FC } from "react";
import styles from "./order-card.module.css";
import IngredientCircle from "./ingredient-circle/ingredient-circle";

import { v4 as uuid } from "uuid";

interface IOrderCard {
    name: string;
    ingredients: string[];
    updatedAt: string;
    number: number;
}

const OrderCard: FC<IOrderCard> = ({
    name,
    ingredients,
    updatedAt,
    number,
}) => {
    return (
        <div className={styles.card}>
            <div className={styles.cardHeading}>
                <p className="text text_type_digits-default">#{number}</p>
                <p className="text text_type_main-default text_color_inactive">
                    {new Date(updatedAt).toLocaleDateString()}
                </p>
            </div>
            <div className="mt-6">
                <p className="text text_type_main-medium">{name}</p>
            </div>
            <div className="mt-6">
                {ingredients.map((ingredient) => {
                    return <IngredientCircle id={ingredient} key={ingredient} />;
                })}
            </div>
        </div>
    );
};

export default OrderCard;
