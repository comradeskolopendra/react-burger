import React, { FC } from "react";

import OrderCard from "./order-card/order-card";

import styles from "./orders-cards.module.css";
import { IFeedOrder } from "../../../services/types";

const OrdersCards: FC<{ orders: IFeedOrder[] | null | undefined }> = ({ orders }) => {
    return (
        <section className={styles.wrapper}>
            {orders &&
                orders.map((order) => {
                    return (
                        <OrderCard
                            name={order.name}
                            number={order.number}
                            ingredientsIds={order.ingredients}
                            updatedAt={order.updatedAt}
                        />
                    );
                })}
        </section>
    );
};

export default OrdersCards;
