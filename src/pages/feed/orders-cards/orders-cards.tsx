import React, { FC } from "react";

import OrderCard from "../../../components/order-card/order-card";

import styles from "./orders-cards.module.css";
import type { IFeedOrder } from "../../../utils/types";

const OrdersCards: FC<{ orders: IFeedOrder[] | null | undefined }> = ({ orders }) => {
    return (
        <section className={styles.wrapper}>
            {orders &&
                orders.map((order) => {
                    return (
                        <OrderCard
                            key={order.number}
                            name={order.name}
                            number={order.number}
                            ingredientsIds={order.ingredients}
                            updatedAt={order.updatedAt}
                            from="feed"
                            status=""
                        />
                    );
                })}
        </section>
    );
};

export default OrdersCards;
