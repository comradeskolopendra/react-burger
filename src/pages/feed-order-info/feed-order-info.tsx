import { FC, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../services/hooks/hooks";
import { getStateWSFeedMessage } from "../../selectors/feed-selectors";

import OrderTitles from './order-titles/order-titles';
import OrderFooter from "./order-footer/order-footer";
import OrderComposition from './order-composition/order-composition';

import styles from "./feed-order-info.module.css";
import { getStateIngredients } from "../../selectors/ingredients-selectors";

const FeedOrderInfo: FC = () => {
    const { orderId } = useParams();
    const wsMessage = useAppSelector(getStateWSFeedMessage);
    const ingredients = useAppSelector(getStateIngredients)

    const orderById = useMemo(() => {
        return wsMessage?.orders.find((order) => order.number === +orderId!);
    }, [orderId]);

    const orderPrice = useMemo(() => {
        if (!orderById) {
            return 0
        }

        const orderIngredients = orderById.ingredients.map((id) => ingredients.find((element) => element._id === id));

        return orderIngredients.reduce((acc, val) => acc + val!.price, 0)
    }, [orderById])

    return (
        <section className={styles.orderInfo}>
            {!orderById && <h3>Идет загрузка</h3>}
            {orderById && (
                <>
                    <OrderTitles
                        name={orderById?.name}
                        orderId={orderId}
                        status={orderById.status}
                    />
                    <OrderComposition
                        order={orderById}
                    />
                    <OrderFooter
                        date={orderById.updatedAt}
                        price={orderPrice}
                    />
                </>
            )}
        </section>
    );
};

export default FeedOrderInfo;
