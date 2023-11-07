import { FC, useMemo } from "react";
import styles from "./order-card.module.css";
import IngredientCircle from "./ingredient-circle/ingredient-circle";
import { useAppSelector } from "../../../../services/hooks/hooks";

import { v4 as uuid } from "uuid";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

interface IOrderCard {
    name: string;
    ingredientsIds: string[];
    updatedAt: string;
    number: number;
}

const OrderCard: FC<IOrderCard> = ({
    name,
    ingredientsIds,
    updatedAt,
    number,
}) => {
    const ingredients = useAppSelector(
        (store) => store.ingredients.ingredients
    );

    const { ingredientsData, restAmount } = useMemo(() => {
        const ingredientsData = ingredientsIds.slice(0, 6).map((id) => {
            return ingredients.find((ingredient) => ingredient._id === id);
        });

        const rest = ingredientsIds.length + 1 - ingredientsData.length;

        return {
            ingredientsData: ingredientsData,
            restAmount: rest,
        };
    }, []);

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
            <div className={`${styles.cardBottom} mt-6`}>
                <div className={styles.cardIngredients}>
                    {ingredientsData.map((ingredient, idx) => {
                        return (
                            <IngredientCircle
                                src={ingredient?.image_mobile}
                                key={uuid()}
                                isLast={idx === 5 && restAmount !== 0}
                                index={idx}
                                restAmount={restAmount}
                            />
                        );
                    })}
                </div>
                <div
                    className={`${styles.price} text text_type_digits-default`}
                >
                    {ingredientsData.reduce((acc, val) => acc + val!.price, 0)}
                    <CurrencyIcon type={"primary"} />
                </div>
            </div>
        </div>
    );
};

export default OrderCard;
