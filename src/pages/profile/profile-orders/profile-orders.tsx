import { FC, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../../services/hooks/hooks";
import OrderCard from "../../../components/order-card/order-card";

import { connect as profileOrdersConnect, disconnect as profileOrdersDisconnect } from "../../../services/actions/profile-orders";

import { getStateWSProfileOrdersMessage, getStateWSProfileStatus } from "../../../selectors/profile-orders-selectors";

import { EWSStatus, TWSStatus } from "../../../services/types";

import styles from "./profile-orders.module.css";
import Loader from "../../../components/loader/loader";

const ProfileOrders: FC = () => {
    const dispatch = useAppDispatch();
    const profileOrders = useAppSelector(getStateWSProfileOrdersMessage);
    const wsStatus = useAppSelector(getStateWSProfileStatus);

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
        <>
            {wsStatus === EWSStatus.CONNECTING ?
                (<Loader />)
                :
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
            }
        </>
    )
};

export default ProfileOrders;