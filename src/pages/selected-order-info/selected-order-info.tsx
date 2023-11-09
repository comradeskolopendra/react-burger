import { FC, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../services/hooks/hooks";

import OrderTitles from './order-titles/order-titles';
import OrderFooter from "./order-footer/order-footer";
import OrderComposition from './order-composition/order-composition';

import styles from "./selected-order-info.module.css";
import { getStateIngredients } from "../../selectors/ingredients-selectors";

import type { IWSMessage } from "../../utils/types";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

interface ISelectedOrderInfo {
    messageFromWS: IWSMessage | null;
    type: "modal" | "page";
    onClose: undefined | (() => void);
}

const SelectedOrderInfo: FC<ISelectedOrderInfo> = ({ messageFromWS, type, onClose }) => {
    const { orderId } = useParams();
    const ingredients = useAppSelector(getStateIngredients);

    const orderById = useMemo(() => {
        return messageFromWS?.orders.find((order) => order.number === +orderId!);
    }, [orderId, messageFromWS]);

    const orderPrice = useMemo(() => {
        if (!orderById) {
            return 0
        }

        const orderIngredients = orderById.ingredients.map((id) => ingredients.find((element) => element._id === id));

        return orderIngredients.reduce((acc, val) => acc + val!.price, 0)
    }, [orderById])

    return (
        <section className={`${type === "page" ? styles.pageBlock : styles.modalBlock} ${styles.wrapper}`}>
            {type === "modal" && (
                <div className={styles.closeBlock}>
                    <button className="closeButton" onClick={onClose}>
                        <CloseIcon type="primary" />
                    </button>
                </div>
            )}
            {!orderById && <h3>Идет загрузка</h3>}
            {orderById && (
                <>
                    <OrderTitles
                        name={orderById?.name}
                        number={orderById.number}
                        status={orderById.status}
                    />
                    <OrderComposition
                        order={orderById}
                    />
                    <OrderFooter
                        date={orderById.updatedAt}
                        price={orderPrice}
                    />
                </>
            )}
        </section>
    );
};

export default SelectedOrderInfo;
