import { useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { useDrop } from "react-dnd";
import { setPrice, setConstructorBun } from "../../services/store/ingredients";
import { getStateConstructorIngredients } from "../../selectors/ingredients-selectors";

import IngredientsWrapper from "./ingredients-wrapper/ingredients-wrapper";
import PriceInfo from "./price-info/price-info";

import styles from "./burger-constructor.module.css";
import BunWrapper from "./bun-wrapper/bun-wrapper";

const BurgerConstructor = ({ onOpenModal }) => {
    const dispatch = useDispatch();
    const constructorIngredients = useSelector(getStateConstructorIngredients);
    const { selectedIngredients, selectedBun } = constructorIngredients;

    const price = useMemo(() => {
        return selectedIngredients.reduce((prev, cur) => {
            return prev + (cur ? cur.price : 0)
        }, 0) + (selectedBun ? selectedBun.price * 2 : 0)
    }, [selectedIngredients, selectedBun])

    useEffect(() => {
        dispatch(setPrice(price));
    }, [constructorIngredients, price, dispatch]);


    const [{ isHoverBun }, bunRef] = useDrop({
        accept: "bun",
        drop: (item, monitor) => {
            dispatch(setConstructorBun({ ...item.ingredient }));
        },
        collect: (monitor) => ({
            isHoverBun: monitor.isOver(),
        }),
    });

    return (
        <div className={styles.wrapper}>
            <section className={`${styles.constructor} pb-10 pr-4`}>
                <BunWrapper
                    bun={selectedBun}
                    side={"top"}
                    bunRef={bunRef}
                    isHoverBun={isHoverBun}
                />
                <IngredientsWrapper ingredients={selectedIngredients} />
                <BunWrapper
                    bun={selectedBun}
                    side={"bottom"}
                    isHoverBun={isHoverBun}
                />
            </section>

            <PriceInfo onOpenModal={onOpenModal} />
        </div>
    );
};

BurgerConstructor.propTypes = {
    onOpenModal: PropTypes.func.isRequired,
};

export default BurgerConstructor;
