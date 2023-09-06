import { useContext } from 'react';

import {
    ConstructorElement
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import IngredientsWrapper from "./ingredients-wrapper/ingredients-wrapper";
import PriceInfo from "./price-info/price-info";
import { BurgerConstructorContext } from '../../context/burgerContext';

import styles from "./burger-constructor.module.css";

const BurgerConstructor = ({ handleOrderClick }) => {
    const { constructorIngredients } = useContext(BurgerConstructorContext);
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

                <IngredientsWrapper ingredients={constructorIngredients} />

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
    ingredients: PropTypes.arrayOf(PropTypes.shape({
        __v: PropTypes.number,
        _id: PropTypes.string,
        calories: PropTypes.number,
        carbohydrates: PropTypes.number,
        fat: PropTypes.number,
        image: PropTypes.string,
        image_large: PropTypes.string,
        image_mobile: PropTypes.string,
        name: PropTypes.string,
        price: PropTypes.number,
        proteins: PropTypes.number,
        type: PropTypes.string
    }).isRequired).isRequired,
    handleOrderClick: PropTypes.func.isRequired
}

export default BurgerConstructor;
