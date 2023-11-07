import { FC } from "react";
import { IFeedOrder } from '../../../services/types';
import styles from "./orders-feed.module.css";
import OrderStatus from "./order-status/order-status";
import OrderStatistic from "./order-statistic/order-statistic";

interface IOrdersStatus {
    totalToday: number | undefined;
    totalAll: number | undefined;
    doneOrders: IFeedOrder[] | undefined;
    notDoneOrders: IFeedOrder[] | undefined;
}

const OrdersFeed: FC<IOrdersStatus> = ({ totalAll, totalToday, doneOrders, notDoneOrders }) => {
    return (
        <section>
            <section className={styles.statuses}>
                <OrderStatus title={"Готовы:"} orders={doneOrders} extraClass="mr-9" />
                <OrderStatus title={"В работе:"} orders={notDoneOrders} extraClass="" />
            </section>
            <section>
                <OrderStatistic title={"Выполнено за все время:"} totalAmount={totalAll} />
                <OrderStatistic title={"Выполнено за сегодня:"} totalAmount={totalToday} />
            </section>
        </section>
    );
};

export default OrdersFeed;
