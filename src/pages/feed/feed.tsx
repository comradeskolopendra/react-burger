import { FC, useMemo, useEffect } from "react";
import styles from "./feed.module.css";
import OrdersCards from "./orders-cards/orders-cards";
import OrdersFeed from "./orders-feed/orders-feed";
import { useAppSelector, useAppDispatch } from "../../services/hooks/hooks";
import { connect as feedConnect, disconnect as feedDisconnect } from '../../services/actions/feed';
import { getStateWSFeedMessage, getStateWSFeedStatus } from '../../selectors/feed-selectors';
import { EWSStatus } from "../../services/types";
import Loader from "../../components/loader/loader";

const Feed: FC = () => {
    const dispatch = useAppDispatch();
    const wsMessage = useAppSelector(getStateWSFeedMessage);
    const wsStatus = useAppSelector(getStateWSFeedStatus);

    useEffect(() => {
        dispatch(feedConnect("wss://norma.nomoreparties.space/orders/all"));

        return () => {
            dispatch(feedDisconnect());
        };
    }, [])

    const { doneOrders, notDoneOrders } = useMemo(() => {
        return {
            doneOrders: wsMessage?.orders.filter(order => order.status === "done"),
            notDoneOrders: wsMessage?.orders.filter(order => order.status !== "done")
        }
    }, [wsMessage])

    return (
        <>
            {wsStatus === EWSStatus.CONNECTING ?
                (<Loader />)
                :
                (<main className={`${styles.main} mt-10`}>
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
                </main>)
            }
        </>
    );
};

export default Feed;
