import styles from "./bun-wrapper.module.css";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";

const BunWrapper = ({ bunRef = null, side, bun, isHoverBun }) => {
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
            ) : <div className={`${styles.nullIngredientsBun} ${isHoverBun ? styles.selectedIngredient : ""} text text_type_main-small`}>
                Попробуйте нажать или перетащить ингредиент!
            </div>}
        </div >
    )
}

export default BunWrapper;