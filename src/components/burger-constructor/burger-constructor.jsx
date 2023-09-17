import { useEffect, useReducer, useMemo, useState } from "react";
import PropTypes from "prop-types"
import { useSelector, useDispatch } from "react-redux";
import { useDrop } from "react-dnd";
import { setConstructorIngredients, setCurrentIngredient } from "../../services/store/ingredients";

import IngredientsWrapper from "./ingredients-wrapper/ingredients-wrapper";
import PriceInfo from "./price-info/price-info";
import { priceReducer } from "../../reducer/reducers";

import styles from "./burger-constructor.module.css";
import BunWrapper from "./bun-wrapper/bun-wrapper";

const BurgerConstructor = ({ onOpenModal }) => {
    const dispatch = useDispatch();
    const { currentIngredient, constructorIngredients } = useSelector(store => store.ingredients);
    const [bun, setBun] = useState(null);

    const { ingredients } = useMemo(() => {
        return {
            ingredients: constructorIngredients.filter(
                (element) => element.type !== "bun"
            ),
        };
    }, [constructorIngredients]);

    const [{ isHoverBun }, bunRef] = useDrop({
        accept: "bun",
        drop: (item, monitor) => {
            console.log(item);
            dispatch(setCurrentIngredient(item.ingredient));
            dispatch(setConstructorIngredients([...constructorIngredients.filter(element => element.type !== "bun"), item.ingredient]))
        },
        collect: monitor => ({
            isHoverBun: monitor.isOver()
        })
    })

    useEffect(() => {
        console.log(constructorIngredients)
        setBun((prevState) => {
            return constructorIngredients.find((element) => element.type === "bun");
        });
    }, [constructorIngredients]);

    // useEffect(() => {
    //     if (bun) {
    //         return priceDispatch({
    //             type: "add",
    //             payload: bun.price * 2,
    //         });
    //     }
    // }, [bun]);

    // useEffect(() => {
    //     if (currentIngredient && currentIngredient.type !== "bun") {
    //         priceDispatch({
    //             type: "add",
    //             payload: currentIngredient.price,
    //         });
    //     }
    // }, [currentIngredient]);

    return (
        <div className={styles.wrapper}>
            <section className={`${styles.constructor} pb-10 pr-4`}>
                <BunWrapper bun={bun} side={"top"} bunRef={bunRef} isHoverBun={isHoverBun} />

                <IngredientsWrapper
                    ingredients={ingredients}
                />

                <BunWrapper bun={bun} side={"bottom"} isHoverBun={isHoverBun} />
            </section>

            <PriceInfo onOpenModal={onOpenModal} />
        </div>
    );
};

BurgerConstructor.propTypes = {
    onOpenModal: PropTypes.func.isRequired,
};

export default BurgerConstructor;
