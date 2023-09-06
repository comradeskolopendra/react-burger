import { useContext, useEffect } from "react";

import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import done from "../../images/done.png";
import { BurgerContext } from "../../context/burgerContext";

import { modalContentTypes } from "../../utils/types";
import styles from "./order-details.module.css";

const OrderDetails = ({ changeVisibility }) => {
    const { order } = useContext(BurgerContext);

    useEffect(() => {
        console.log(order);
    }, [order])
    return (
        <div className={`${styles.modalBlock} pt-30 pb-30`}>
            <div className={`${styles.closeWrapper}`}>
                <button
                    className="closeButton"
                    onClick={() => changeVisibility(false)}
                >
                    <CloseIcon />
                </button>
            </div>
            <p
                className={`${styles.glowBigNumbers} mb-8 text text_type_digits-large`}
            >
                {order.data.order.number}
            </p>
            <p className="text text_type_main-medium">идентификатор заказа</p>
            <img src={done} alt="done" className="mt-15 mb-15" />
            <p className="text text_type_main-default mb-2">
                Ваш заказ начали готовить
            </p>
            <p className="text text_type_main-default text_color_inactive">
                Дождитесь готовности на орбитальной станции
            </p>
        </div>
    );
};

OrderDetails.propTypes = modalContentTypes;

export default OrderDetails;
