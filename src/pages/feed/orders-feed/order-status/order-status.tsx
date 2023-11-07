import { FC } from "react";
import styles from "./order-status.module.css";
import { IFeedOrder } from "../../../../services/types";

interface IOrdersStatus {
    orders: IFeedOrder[] | undefined;
    extraClass: string;
    title: string;
}

const OrderStatus: FC<IOrdersStatus> = ({ orders, extraClass = "", title }) => {
    return <div className={`${styles.status} ${extraClass}`}>
        <h3 className={"text text_type_main-medium mb-4"}>{title}</h3>
        <div className={styles.statusNumbers}>
            {orders?.slice(0, 10).map(order => {
                return <p className={`${styles.success} text text_type_main-default mt-2`}>{order.number}</p>
            })}
        </div>
    </div>
};

export default OrderStatus;