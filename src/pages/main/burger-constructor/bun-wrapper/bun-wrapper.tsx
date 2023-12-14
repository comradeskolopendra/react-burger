import styles from "./bun-wrapper.module.css";
import { IIngredient } from '../../../../utils/types';
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { FC, LegacyRef } from "react";

interface IBunWrapper {
    bunRef?: LegacyRef<HTMLDivElement> | undefined;
    side: "top" | "bottom" | undefined;
    bun: IIngredient | null;
    isHoverBun: boolean;
}

const BunWrapper: FC<IBunWrapper> = ({ bunRef = null, side, bun, isHoverBun }) => {
    return (
        <div ref={bunRef}>
            {bun ? (
                <ConstructorElement
                    type={side}
                    isLocked={true}
                    price={bun.price}
                    text={`${bun.name} (${side === "top" ? "верх" : "низ"})`}
                    thumbnail={bun.image}
                    extraClass="ml-8"
                />
            ) : (
                <div
                    className={`${styles.nullIngredientsBun} ${isHoverBun ? styles.selectedIngredient : ""
                        } text text_type_main-small`}
                    data-testid={"bun-place"}
                >
                    Попробуйте перетащить булку!
                </div>
            )}
        </div>
    );
};

export default BunWrapper;
