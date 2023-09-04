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
    ingredients: PropTypes.arrayOf(PropTypes.shape({
        __v: PropTypes.number,
        _id: PropTypes.string,
        calories: PropTypes.number,
        carbohydrates: PropTypes.number,
        fat: PropTypes.number,
        image: PropTypes.string,
        image_large: PropTypes.string,
        image_mobile: PropTypes.string,
        name: PropTypes.string,
        price: PropTypes.number,
        proteins: PropTypes.number,
        type: PropTypes.string
    }).isRequired).isRequired
}

export default IngredientsWrapper;