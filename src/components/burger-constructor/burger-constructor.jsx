import { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types"
import { useSelector, useDispatch } from "react-redux";
import { useDrop } from "react-dnd";
import { setConstructorIngredients, setCurrentIngredient } from "../../services/store/ingredients";
import { setPrice } from "../../services/store/ingredients";

import IngredientsWrapper from "./ingredients-wrapper/ingredients-wrapper";
import PriceInfo from "./price-info/price-info";

import styles from "./burger-constructor.module.css";
import BunWrapper from "./bun-wrapper/bun-wrapper";

const BurgerConstructor = ({ onOpenModal }) => {
    const dispatch = useDispatch();
    const { constructorIngredients } = useSelector(store => store.ingredients);
    const [bun, setBun] = useState(null);

    const { ingredients, price } = useMemo(() => {
        return {
            ingredients: constructorIngredients.filter(
                (element) => element.type !== "bun"
            ),
            price: constructorIngredients.reduce((prev, cur) => {
                if (cur.type === "bun") {
                    prev += +cur.price * 2;
                } else {
                    prev += +cur.price;
                }

                return prev;
            }, 0)
        };
    }, [constructorIngredients]);

    const [{ isHoverBun }, bunRef] = useDrop({
        accept: "bun",
        drop: (item, monitor) => {
            dispatch(setConstructorIngredients([...constructorIngredients.filter(element => element.type !== "bun"), item.ingredient]))
        },
        collect: monitor => ({
            isHoverBun: monitor.isOver()
        })
    })

    useEffect(() => {
        setBun((prevState) => {
            return constructorIngredients.find((element) => element.type === "bun");
        });
    }, [constructorIngredients]);

    useEffect(() => {
        dispatch(setPrice(price));
    }, [price])

    return (
        <div className={styles.wrapper}>
            <section className={`${styles.constructor} pb-10 pr-4`}>
                <BunWrapper bun={bun} side={"top"} bunRef={bunRef} isHoverBun={isHoverBun} />
                <IngredientsWrapper ingredients={ingredients} />
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