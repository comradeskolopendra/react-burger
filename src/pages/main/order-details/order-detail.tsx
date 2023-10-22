import { FC } from "react";
import { useSelector } from "react-redux";
import { getStateOrderRequest, getStateOrder } from '../../../selectors/order-selectors';

import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import done from "../../../images/done.png";
import styles from "./order-details.module.css";

interface IOrderDetails {
    onClose: (...args: any) => any;
}

interface IOrder {
    order: { number: number };
}

const OrderDetails: FC<IOrderDetails> = ({ onClose }) => {
    const order: IOrder = useSelector(getStateOrder);
    const orderRequest: boolean = useSelector(getStateOrderRequest);

    return (
        <div className={`${styles.modalBlock} pt-30 pb-30`}>
            <div className={`${styles.closeWrapper}`}>
                <button
                    className="closeButton"
                    onClick={onClose}
                >
                    <CloseIcon type="primary" />
                </button>
            </div>
            <p
                className={`${styles.glowBigNumbers} mb-8 text text_type_digits-large`}
            >
                {!orderRequest ? order?.order?.number : "0000"}
            </p>
            <p className="text text_type_main-medium">идентификатор заказа</p>
            <img src={`${done}`} alt="done" className="mt-15 mb-15" />
            <p className="text text_type_main-default mb-2">
                Ваш заказ начали готовить
            </p>
            <p className="text text_type_main-default text_color_inactive">
                Дождитесь готовности на орбитальной станции
            </p>
        </div>
    );
};

export default OrderDetails;
