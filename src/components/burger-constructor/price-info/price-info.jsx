import { CurrencyIcon, Button } from "@ya.praktikum/react-developer-burger-ui-components";

import { priceInfoTypes } from '../../../utils/types';
import styles from "./price-info.module.css";

const PriceInfo = ({ priceState, onOpenModal }) => {
    return (
        <section className={styles.orderBlock}>
            <div className={styles.price}>
                <p className="mr-2 text text_type_digits-medium">
                    {priceState.price}
                </p>
                <CurrencyIcon type="primary" />
            </div>

            <Button
                onClick={() => onOpenModal(true)}
                htmlType="button"
                type="primary"
                size="large"
            >
                Оформить заказ
            </Button>
        </section>
    );
};

PriceInfo.propTypes = priceInfoTypes;

export default PriceInfo;