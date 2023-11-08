import { FC, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../services/hooks/hooks";
import { getStateWSFeedMessage } from "../../selectors/feed-selectors";

import OrderTitles from './order-titles/order-titles';

import styles from "./feed-order-info.module.css";
import OrderComposition from './order-composition/order-composition';

const FeedOrderInfo: FC = () => {
    const { orderId } = useParams();
    const wsMessage = useAppSelector(getStateWSFeedMessage);

    const orderById = useMemo(() => {
        return wsMessage?.orders.find((order) => order.number === +orderId!);
    }, [orderId]);

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
                    {/* <OrderC */}
                </>
            )}
        </section>
    );
};

export default FeedOrderInfo;
