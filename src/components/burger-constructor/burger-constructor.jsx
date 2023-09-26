import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { useDrop } from "react-dnd";
import { setConstructorBun } from "../../services/store/constructor";
import { getStateSelectedBun, getStateSelectedIngredients } from "../../selectors/constructor-selectors";

import IngredientsWrapper from "./ingredients-wrapper/ingredients-wrapper";
import PriceInfo from "./price-info/price-info";

import styles from "./burger-constructor.module.css";
import BunWrapper from "./bun-wrapper/bun-wrapper";

const BurgerConstructor = ({ onOpenModal }) => {
    const dispatch = useDispatch();
    const selectedBun = useSelector(getStateSelectedBun);
    const selectedIngredients = useSelector(getStateSelectedIngredients);

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
