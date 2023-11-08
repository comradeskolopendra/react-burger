import { FC } from "react";

import styles from "./order-titles.module.css";

interface IOrderTitles {
    name: string | undefined;
    orderId: string | undefined;
    status: string | undefined;
}

const OrderTitles: FC<IOrderTitles> = ({ name, orderId, status }) => {
    return (
        <div className={`mb-15`}>
            <h3
                className={`${styles.orderNumber} text text_type_digits-default pb-10`}
            >
                #{orderId}
            </h3>
            <h2 className={`text text_type_main-medium mb-3`}>{name}</h2>
            <p className={`${styles.success} text text_type_main-default`}>
                Выполнен
            </p>
        </div>
    );
};

export default OrderTitles;
