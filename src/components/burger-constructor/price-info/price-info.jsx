import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { getStatePrice, getStateConstructorIngredients } from '../../../selectors/ingredients-selectors';
import {
    CurrencyIcon,
    Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./price-info.module.css";

const PriceInfo = ({ onOpenModal }) => {
    const price = useSelector(getStatePrice);
    const constructorIngredients = useSelector(getStateConstructorIngredients);
    const {selectedBun} = constructorIngredients;

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
