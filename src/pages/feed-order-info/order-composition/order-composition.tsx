import { FC, useMemo } from "react";
import { useAppSelector } from "../../../services/hooks/hooks";
import styles from "./order-composition.module.css";
import { IFeedOrder } from "../../../services/types";
import { getStateIngredients } from "../../../selectors/ingredients-selectors";
import CompositionRow from "./composition-row/composition-row";

const OrderComposition: FC<{ order: IFeedOrder | undefined }> = ({ order }) => {
    const ingredients = useAppSelector(getStateIngredients);

    const { orderIngredients } = useMemo(() => {
        return {
            orderIngredients: order?.ingredients.map((id) => {
                const ingredient = ingredients.find((element) => element._id === id);

                return ingredient;
            }
            ),
        };
    }, []);

    return (
        <div>
            <h3
                className={`${styles.compositionTitle} mb-6 text text_type_main-medium`}
            >
                Состав:
            </h3>
            <section>
                {orderIngredients!.map(ingredient => {
                    return <CompositionRow name={ingredient?.name} price={ingredient?.price} amount={2} image={ingredient?.image_mobile} />
                })}
            </section>
        </div>
    );
};

export default OrderComposition;
