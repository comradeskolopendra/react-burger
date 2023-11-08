import { FC, useMemo } from "react";
import { useAppSelector } from "../../../services/hooks/hooks";
import OrderCard from "../../../components/order-card/order-card";

import { getStateIngredients } from "../../../selectors/ingredients-selectors";
import { getStateWSProfileOrdersMessage } from "../../../selectors/profile-orders-selectors";

import styles from "./profile-orders.module.css";

const ProfileOrders: FC = () => {
    const ingredients = useAppSelector(getStateIngredients);
    const profileOrders = useAppSelector(getStateWSProfileOrdersMessage);

    const orderIngredients = useMemo(() => {
        // return profileOrders?.orders.map((id) => ingredients.find(element => element._id === id));
    }, [profileOrders])

    console.log(profileOrders)

    return (
        <div className={styles.orderCards}>

        </div>
    )
};

export default ProfileOrders;