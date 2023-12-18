import { FC, useMemo, useEffect, DetailedHTMLProps, HTMLAttributes } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../services/hooks/hooks";

import OrderTitles from './order-titles/order-titles';
import OrderFooter from "./order-footer/order-footer";
import OrderComposition from './order-composition/order-composition';

import styles from "./selected-order-info.module.css";
import { getStateIngredients } from "../../selectors/ingredients-selectors";
import { getStateOrderByNumber } from '../../selectors/selected-order-selectors';

import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { getOrderByNumber } from '../../services/actions/selected-order';

interface ISelectedOrderInfo extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {
    type: "modal" | "page";
    onClose: undefined | (() => void);
}

const SelectedOrderInfo: FC<ISelectedOrderInfo> = ({ type, onClose }) => {
    const { orderId } = useParams();
    const dispatch = useAppDispatch();
    const ingredients = useAppSelector(getStateIngredients);
    const orderByNumber = useAppSelector(getStateOrderByNumber);

    useEffect(() => {
        dispatch(getOrderByNumber(+orderId!));
    }, [])

    const orderById = useMemo(() => {
        return orderByNumber?.orders.find(
            (order) => order.number === +orderId!
        );
    }, [orderId, orderByNumber]);

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
            {!orderById && <h3 className={`${styles.loadingTitle} text text_type_main-medium`}>Идет загрузка</h3>}
            {orderById && (
                <>
                    <OrderTitles
                        type={type}
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
