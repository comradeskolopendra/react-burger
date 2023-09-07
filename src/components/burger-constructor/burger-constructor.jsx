import { useContext, useEffect, useReducer, useMemo, useState } from "react";

import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { burgerSidesTypes } from "../../utils/types";
import IngredientsWrapper from "./ingredients-wrapper/ingredients-wrapper";
import PriceInfo from "./price-info/price-info";
import { BurgerContext } from "../../context/context";
import { priceReducer } from "../../reducer/reducers";

import styles from "./burger-constructor.module.css";

const BurgerConstructor = ({ onOpenModal }) => {
    const [priceState, priceDispatch] = useReducer(priceReducer, { price: 0 });
    const { constructorData, currentIngredient } = useContext(BurgerContext);
    const [bun, setBun] = useState(null);

    const { ingredients } = useMemo(() => {
        return {
            ingredients: constructorData.filter(
                (element) => element.type !== "bun"
            ),
        };
    }, [constructorData]);

    useEffect(() => {
        setBun((prevState) => {
            if (prevState && currentIngredient.type === "bun") {
                priceDispatch({ type: "delete", payload: prevState.price * 2 });
            }
            return constructorData.find((element) => element.type === "bun");
        });
    }, [constructorData]);

    useEffect(() => {
        if (bun) {
            return priceDispatch({
                type: "add",
                payload: bun.price * 2,
            });
        }
    }, [bun]);

    useEffect(() => {
        console.log(currentIngredient)
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
                    dispatch={priceDispatch}
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

BurgerConstructor.propTypes = burgerSidesTypes;

export default BurgerConstructor;
