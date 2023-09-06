import { useContext, useEffect, useReducer } from "react";

import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { burgerSidesTypes } from "../../utils/types";
import IngredientsWrapper from "./ingredients-wrapper/ingredients-wrapper";
import PriceInfo from "./price-info/price-info";
import { BurgerContext } from "../../context/burgerContext";
import { priceReducer } from "../../reducer/reducers";

import styles from "./burger-constructor.module.css";

const BurgerConstructor = ({ onOpenModal }) => {
    const [priceState, priceDispatch] = useReducer(priceReducer, { price: 0 });
    const { constructorData, constructorBun, currentIngredient } =
        useContext(BurgerContext);

    useEffect(() => {
        if (constructorBun) {
            return priceDispatch({
                type: "add",
                payload: constructorBun.price * 2,
            });
        }
    }, [constructorBun]);

    useEffect(() => {
        if (currentIngredient && currentIngredient.type !== "bun") {
            return priceDispatch({
                type: "add",
                payload: currentIngredient.price,
            });
        }
    }, [currentIngredient, constructorData]);

    return (
        <div className={styles.wrapper}>
            <section className={`${styles.constructor} pb-10 pr-4`}>
                {constructorBun && (
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        price={constructorBun.price}
                        text={`${constructorBun.name} (верх)`}
                        thumbnail={constructorBun.image}
                        extraClass="ml-8"
                    />
                )}

                <IngredientsWrapper
                    ingredients={constructorData}
                    dispatch={priceDispatch}
                />

                {constructorBun && (
                    <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        price={constructorBun.price}
                        text={`${constructorBun.name} (низ)`}
                        thumbnail={constructorBun.image}
                        extraClass="ml-8"
                    />
                )}
            </section>

            <PriceInfo priceState={priceState} onOpenModal={onOpenModal} />
        </div>
    );
};

BurgerConstructor.propTypes = burgerSidesTypes;

export default BurgerConstructor;
