import { FC, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../../services/hooks/hooks";
import OrderCard from "../../../components/order-card/order-card";

import { connect as profileOrdersConnect, disconnect as profileOrdersDisconnect } from "../../../services/actions/profile-orders";

import { getStateWSProfileOrdersMessage } from "../../../selectors/profile-orders-selectors";

import styles from "./profile-orders.module.css";

const ProfileOrders: FC = () => {
    const profileOrders = useAppSelector(getStateWSProfileOrdersMessage);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const token = localStorage.getItem("accessToken")?.split(" ")[1];
        dispatch(
            profileOrdersConnect(
                `wss://norma.nomoreparties.space/orders?token=${token}`
            )
        );

        return () => {
            dispatch(profileOrdersDisconnect());
        };
    }, [])

    return (
        <div className={styles.orderCards}>
            {
                profileOrders?.orders.map((order) => {
                    return <OrderCard
                        key={order.number}
                        ingredientsIds={order.ingredients}
                        updatedAt={order.updatedAt}
                        name={order.name}
                        number={order.number}
                        from={"profile/orders"}
                        status={order.status}
                    />
                })
            }
        </div>
    )
};

export default ProfileOrders;