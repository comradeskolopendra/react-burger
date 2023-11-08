import { FC, useMemo } from "react";
import { useAppSelector } from "../../../services/hooks/hooks";
import styles from "./order-composition.module.css";
import { IFeedOrder } from "../../../services/types";
import { getStateIngredients } from "../../../selectors/ingredients-selectors";
import CompositionRow from "./composition-row/composition-row";

const OrderComposition: FC<{ order: IFeedOrder | undefined }> = ({ order }) => {
    const ingredients = useAppSelector(getStateIngredients);

    const { orderIngredients } = useMemo(() => {
        const result: any = {};

        order?.ingredients.forEach(id => {
            if (Object.keys(result).includes(id)) {
                result[id] += 1;
            } else {
                result[id] = 1;
            }
        })

        return {
            orderIngredients: Object.keys(result).map((item) => {
                return { ...ingredients.find(element => element._id === item), amount: result[item] }
            })
        }
    }, []);

    return (
        <div className={styles.wrapper}>
            <h3
                className={`${styles.compositionTitle} text text_type_main-medium`}
            >
                Состав:
            </h3>
            <section className={`${styles.ingredients} mt-6`}>
                {orderIngredients!.map(ingredient => {
                    return <CompositionRow name={ingredient?.name} price={ingredient?.price} amount={ingredient.amount} image={ingredient?.image_mobile} />
                })}
            </section>
        </div>
    );
};

export default OrderComposition;
