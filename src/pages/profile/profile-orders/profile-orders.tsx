import { FC, useMemo } from "react";
import { useAppSelector } from "../../../services/hooks/hooks";
import OrderCard from "../../../components/order-card/order-card";

import { getStateIngredients } from "../../../selectors/ingredients-selectors";
import { getStateWSProfileOrdersMessage } from "../../../selectors/profile-orders-selectors";

import styles from "./profile-orders.module.css";

const ProfileOrders: FC = () => {
    const profileOrders = useAppSelector(getStateWSProfileOrdersMessage);

    return (
        <div className={styles.orderCards}>
            {
                profileOrders?.orders.map((order) => {
                    return <OrderCard
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