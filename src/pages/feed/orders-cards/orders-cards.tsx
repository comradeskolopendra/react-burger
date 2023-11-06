import React, { FC } from "react";

import { useAppSelector } from "../../../services/hooks/hooks";
import OrderCard from "./order-card/order-card";

import styles from "./orders-cards.module.css";

const OrdersCards: FC = () => {
    const wsMessage = useAppSelector((store) => store.feed.wsMessage);

    return (
        <section className={styles.wrapper}>
            {wsMessage &&
                wsMessage.orders.map((order) => {
                    return (
                        <OrderCard
                            name={order.name}
                            number={order.number}
                            ingredients={order.ingredients}
                            updatedAt={order.updatedAt}
                        />
                    );
                })}
        </section>
    );
};

export default OrdersCards;
