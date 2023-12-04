import { FC } from "react";
import { useAppDispatch, useAppSelector } from '../../../services/hooks/hooks';
import { useDrop } from "react-dnd";
import { setConstructorBun } from '../../../services/store/constructor';
import { getStateSelectedBun, getStateSelectedIngredients } from '../../../selectors/constructor-selectors';

import IngredientsWrapper from "./ingredients-wrapper/ingredients-wrapper";
import PriceInfo from "./price-info/price-info";

import styles from "./burger-constructor.module.css";
import BunWrapper from "./bun-wrapper/bun-wrapper";
import { IIngredient } from "../../../utils/types";

interface IBurgerConstructor {
    onOpenModal: () => void;
}

const BurgerConstructor: FC<IBurgerConstructor> = ({ onOpenModal }) => {
    const dispatch = useAppDispatch();
    const selectedBun = useAppSelector(getStateSelectedBun);
    const selectedIngredients = useAppSelector(getStateSelectedIngredients);

    const [{ isHoverBun }, bunRef] = useDrop({
        accept: "bun",
        drop: (item: IIngredient, monitor) => {
            dispatch(setConstructorBun({ ...item }));
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

export default BurgerConstructor;
