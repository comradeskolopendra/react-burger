import { DragIcon, ConstructorElement, } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import styles from "./ingredients-wrapper.module.css";

const IngredientsWrapper = ({ ingredients }) => {
    return (
        <ul className={`${styles.ingredientsWrapper}`}>
            {ingredients.map((ingredient) => (
                <li
                    key={ingredient._id}
                    className={styles.ingredient}
                >
                    <div className="mr-2">
                        <DragIcon />
                    </div>
                    <ConstructorElement
                        isLocked={false}
                        price={ingredient.price}
                        thumbnail={ingredient.image}
                        text={ingredient.name}
                    />
                </li>
            ))}
        </ul>
    );
};

IngredientsWrapper.propTypes = {
    ingredients: PropTypes.arrayOf(PropTypes.object)
}

export default IngredientsWrapper;