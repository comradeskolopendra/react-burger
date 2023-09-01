import {
    ConstructorElement
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import IngredientsWrapper from "./ingredients-wrapper/ingredients-wrapper";
import PriceInfo from "./price-info/price-info";

import styles from "./burger-constructor.module.css";

const BurgerConstructor = ({ ingredients, handleOrderClick }) => {
    return (
        <div className={styles.wrapper}>
            <section className={`${styles.constructor} pb-10 pr-4`}>
                <ConstructorElement
                    type="top"
                    isLocked={true}
                    price={200}
                    text="Краторная булка N-200i (верх)"
                    thumbnail="https://code.s3.yandex.net/react/code/bun-02.png"
                    extraClass="ml-8"
                />

                <IngredientsWrapper ingredients={ingredients} />

                <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    price={200}
                    text="Краторная булка N-200i (низ)"
                    thumbnail="https://code.s3.yandex.net/react/code/bun-02.png"
                    extraClass="ml-8"
                />
            </section>

            <PriceInfo handleOrderClick={handleOrderClick} />
        </div>
    );
};

BurgerConstructor.propTypes = {
    ingredients: PropTypes.arrayOf(PropTypes.object),
    handleOrderClick: PropTypes.func
}

export default BurgerConstructor;
