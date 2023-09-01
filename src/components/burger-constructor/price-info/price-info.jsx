import { CurrencyIcon, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import styles from "./price-info.module.css";

const PriceInfo = ({ handleOrderClick }) => {
    return (
        <section className={styles.orderBlock}>
            <div className={styles.price}>
                <p className="mr-2 text text_type_digits-medium">123</p>
                <CurrencyIcon type="primary" />
            </div>

            <Button
                onClick={() => handleOrderClick(true)}
                htmlType="button"
                type="primary"
                size="large"
            >
                Оформить заказ
            </Button>
        </section>
    )
};

PriceInfo.propTypes = {
    handleOrderClick: PropTypes.func
}

export default PriceInfo;