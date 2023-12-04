import { FC } from "react";
import styles from "./order-statistic.module.css";

interface IOrderStatistic {
    title: string;
    totalAmount: number | undefined;
}

const OrderStatistic: FC<IOrderStatistic> = ({ title, totalAmount }) => {
    return (
        <div className={`mt-15`}>
            <h3 className="text text_type_main-medium">{title}</h3>
            <p className={`${styles.glowBigNumbers} text text_type_digits-large`}>{totalAmount}</p>
        </div>
    )
};

export default OrderStatistic;