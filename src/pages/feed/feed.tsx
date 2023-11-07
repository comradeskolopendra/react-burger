import { FC, useMemo } from "react";
import styles from "./feed.module.css";
import OrdersCards from "./orders-cards/orders-cards";
import OrdersFeed from "./orders-feed/orders-feed";
import { useAppSelector } from "../../services/hooks/hooks";

const Feed: FC = () => {
    const wsMessage = useAppSelector((store) => store.feed.wsMessage);

    const { doneOrders, notDoneOrders } = useMemo(() => {
        return {
            doneOrders: wsMessage?.orders.filter(order => order.status === "done"),
            notDoneOrders: wsMessage?.orders.filter(order => order.status !== "done")
        }
    }, [wsMessage])

    return (
        <main className={`${styles.main} mt-10`}>
            <p className="text text_type_main-large">Лента заказов</p>
            <section className={styles.contentWrapper}>
                <OrdersCards orders={wsMessage?.orders} />
                <OrdersFeed
                    totalToday={wsMessage?.totalToday}
                    totalAll={wsMessage?.total}
                    doneOrders={doneOrders}
                    notDoneOrders={notDoneOrders}
                />
            </section>
        </main>
    );
};

export default Feed;
