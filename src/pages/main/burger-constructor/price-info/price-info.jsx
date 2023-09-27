import { useMemo } from "react";

import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { getStateSelectedBun, getStateSelectedIngredients } from '../../../../selectors/constructor-selectors';
import {
    CurrencyIcon,
    Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./price-info.module.css";

const PriceInfo = ({ onOpenModal }) => {
    const selectedBun = useSelector(getStateSelectedBun);
    const selectedIngredients = useSelector(getStateSelectedIngredients);

    const price = useMemo(() => {
        return selectedIngredients.reduce((prev, cur) => {
            return prev + (cur ? cur.price : 0)
        }, 0) + (selectedBun ? selectedBun.price * 2 : 0)
    }, [selectedIngredients, selectedBun])

    return (
        <section className={styles.orderBlock}>
            <div className={styles.price}>
                <p className="mr-2 text text_type_digits-medium">{price}</p>
                <CurrencyIcon type="primary" />
            </div>

            <Button
                onClick={() => onOpenModal(true)}
                htmlType="button"
                type="primary"
                size="large"
                disabled={!selectedBun}
            >
                Оформить заказ
            </Button>
        </section>
    );
};

PriceInfo.propTypes = {
    onOpenModal: PropTypes.func.isRequired
};
export default PriceInfo;
