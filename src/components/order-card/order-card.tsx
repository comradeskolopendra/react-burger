import { FC, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import styles from "./order-card.module.css";
import IngredientCircle from "../ingredient-circle/ingredient-circle";

import { useAppSelector } from "../../services/hooks/hooks";
import { getStateIngredients } from "../../selectors/ingredients-selectors";

import { v4 as uuid } from "uuid";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

interface IOrderCard {
    name: string;
    ingredientsIds: string[];
    updatedAt: string;
    number: number;
    from: string;
    status: string | undefined;
}

const OrderCard: FC<IOrderCard> = ({
    name,
    ingredientsIds,
    updatedAt,
    number,
    from,
    status,
}) => {
    const location = useLocation();
    const ingredients = useAppSelector(getStateIngredients);

    const { ingredientsData, restAmount, allIngredients } = useMemo(() => {
        const allIngredients = ingredientsIds
            .map((id) => {
                return {
                    ...ingredients.find((ingredient) => ingredient._id === id),
                    uniqId: uuid(),
                };
            })
            .filter((element) => element !== undefined);

        const ingredientsData = ingredientsIds.slice(0, 6).map((id) => {
            return {
                ...ingredients.find((ingredient) => ingredient._id === id),
                uniqId: uuid(),
            };
        });

        const rest = ingredientsIds.length + 1 - ingredientsData.length;

        return {
            ingredientsData: ingredientsData,
            restAmount: rest,
            allIngredients: allIngredients,
        };
    }, []);

    return (
        <Link
            to={`/${from}/${number}`}
            className={styles.card}
            state={{ background: location }}
        >
            <div className={styles.cardHeading}>
                <p className="text text_type_digits-default">#{number}</p>
                <p className="text text_type_main-default text_color_inactive">
                    {new Date(updatedAt).toLocaleDateString()}
                </p>
            </div>
            <div className="mt-6">
                <p className="text text_type_main-medium">{name}</p>
                <div className="mt-2">
                    {status === "done" && (
                        <p
                            className={`${styles.success} text text_type_main-default`}
                        >
                            Выполнен
                        </p>
                    )}
                    {status === "created" && (
                        <p className="text text_type_main-default">Создан</p>
                    )}
                    {status === "pending" && (
                        <p className="text text_type_main-default">Готовится</p>
                    )}
                </div>
            </div>
            <div className={`${styles.cardBottom} mt-6`}>
                <div className={styles.cardIngredients}>
                    {ingredientsData.map((ingredient, idx) => {
                        return (
                            <IngredientCircle
                                src={ingredient?.image_mobile}
                                key={ingredient.uniqId}
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
                    {allIngredients
                        ? allIngredients.reduce((acc, val) => {
                              if (val.price) {
                                  return acc + val!.price;
                              }

                              return 0
                          }, 0)
                        : 0}
                    <CurrencyIcon type={"primary"} />
                </div>
            </div>
        </Link>
    );
};

export default OrderCard;
