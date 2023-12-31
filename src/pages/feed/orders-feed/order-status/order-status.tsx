import { FC } from "react";
import styles from "./order-status.module.css";
import { IFeedOrder } from "../../../../utils/types";

interface IOrdersStatus {
    orders: IFeedOrder[] | undefined;
    extraClass: string;
    title: string;
    isDone: boolean;
}

const OrderStatus: FC<IOrdersStatus> = ({ orders, extraClass = "", title, isDone }) => {
    return <div className={`${styles.status} ${extraClass}`}>
        <h3 className={"text text_type_main-medium mb-4"}>{title}</h3>
        <div className={styles.statusNumbers}>
            {orders?.slice(0, 10).map(order => {
                return <p className={`${isDone ? styles.success : ""} text text_type_main-default mt-2`} key={order.number}>{order.number}</p>
            })}
        </div>
    </div>
};

export default OrderStatus;