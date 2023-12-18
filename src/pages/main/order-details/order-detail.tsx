import { FC } from "react";
import { useAppSelector } from '../../../services/hooks/hooks';
import { getStateOrderRequest, getStateOrder } from '../../../selectors/order-selectors';

import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import done from "../../../images/done.png";
import styles from "./order-details.module.css";

interface IOrderDetails {
    onClose: () => void;
}

const OrderDetails: FC<IOrderDetails> = ({ onClose }) => {
    const order = useAppSelector(getStateOrder);
    const orderRequest = useAppSelector(getStateOrderRequest);

    return (
        <div className={`${styles.modalBlock} pt-30 pb-30`}>
            <div className={`${styles.closeWrapper}`}>
                <button
                    className="closeButton"
                    onClick={onClose}
                    data-testid={"order-modal-close"}
                >
                    <CloseIcon type="primary" />
                </button>
            </div>
            <p
                className={`${styles.glowBigNumbers} mb-8 text text_type_digits-large`}
            >
                {!orderRequest ? order?.number : "0000"}
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
