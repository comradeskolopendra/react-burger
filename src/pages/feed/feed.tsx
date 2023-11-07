import { FC } from "react";
import styles from "./feed.module.css";
import OrdersCards from "./orders-cards/orders-cards";
import OrdersStatus from "./orders-status/orders-status";
import { useAppSelector } from "../../services/hooks/hooks";

const Feed: FC = () => {
    const wsMessage = useAppSelector((store) => store.feed.wsMessage);

    return (
        <main className={`${styles.main} mt-10`}>
            <p className="text text_type_main-large">Лента заказов</p>
            <section className={styles.contentWrapper}>
                <OrdersCards orders={wsMessage?.orders} />
                <OrdersStatus message={wsMessage} />
            </section>
        </main>
    );
};

export default Feed;
