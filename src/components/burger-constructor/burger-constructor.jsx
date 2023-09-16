import { useEffect, useReducer, useMemo, useState } from "react";
import PropTypes from "prop-types"
import { useSelector } from "react-redux";

import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientsWrapper from "./ingredients-wrapper/ingredients-wrapper";
import PriceInfo from "./price-info/price-info";
import { priceReducer } from "../../reducer/reducers";

import styles from "./burger-constructor.module.css";

const BurgerConstructor = ({ onOpenModal }) => {
    const [priceState, priceDispatch] = useReducer(priceReducer, { price: 0 });
    const { currentIngredient, constructorIngredients } = useSelector(store => store.ingredients);
    const [bun, setBun] = useState(null);

    const { ingredients } = useMemo(() => {
        return {
            ingredients: constructorIngredients.filter(
                (element) => element.type !== "bun"
            ),
        };
    }, [constructorIngredients]);

    useEffect(() => {
        setBun((prevState) => {
            if (prevState && currentIngredient.type === "bun") {
                priceDispatch({ type: "delete", payload: prevState.price * 2 });
            }
            return constructorIngredients.find((element) => element.type === "bun");
        });
    }, [constructorIngredients]);

    useEffect(() => {
        if (bun) {
            return priceDispatch({
                type: "add",
                payload: bun.price * 2,
            });
        }
    }, [bun]);

    useEffect(() => {
        if (currentIngredient && currentIngredient.type !== "bun") {
            priceDispatch({
                type: "add",
                payload: currentIngredient.price,
            });
        }
    }, [currentIngredient]);

    return (
        <div className={styles.wrapper}>
            <section className={`${styles.constructor} pb-10 pr-4`}>
                {bun && (
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        price={bun.price}
                        text={`${bun.name} (верх)`}
                        thumbnail={bun.image}
                        extraClass="ml-8"
                    />
                )}

                <IngredientsWrapper
                    ingredients={ingredients}
                    dispatchPrice={priceDispatch}
                />

                {bun && (
                    <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        price={bun.price}
                        text={`${bun.name} (низ)`}
                        thumbnail={bun.image}
                        extraClass="ml-8"
                    />
                )}
            </section>

            <PriceInfo priceState={priceState} onOpenModal={onOpenModal} />
        </div>
    );
};

BurgerConstructor.propTypes = {
    onOpenModal: PropTypes.func.isRequired,
};

export default BurgerConstructor;
