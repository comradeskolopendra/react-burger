import { FC } from "react";

import styles from "./order-titles.module.css";

interface IOrderTitles {
    name: string | undefined;
    number: number | undefined;
    status: string | undefined;
}

const OrderTitles: FC<IOrderTitles> = ({ name, number, status }) => {
    return (
        <div className={`${styles.orderHeading} mb-15`}>
            <h3
                className={`${styles.orderNumber} text text_type_digits-default pb-10`}
            >
                #{number}
            </h3>
            <h2 className={`text text_type_main-medium mb-3`}>{name}</h2>
            <p className={`${status === "done" ? styles.success : ""} text text_type_main-default`}>
                {status === "done" ? "Выполнен" : "В работе"}
            </p>
        </div>
    );
};

export default OrderTitles;
