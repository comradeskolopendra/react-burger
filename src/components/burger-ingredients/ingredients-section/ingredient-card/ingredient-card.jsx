import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import styles from "./ingredient-card.module.css";

const IngredientCard = ({ ingredient, onClick }) => {
    return (
        <div key={ingredient._id} onClick={() => onClick(ingredient)} className={styles.card}>
            <img
                src={ingredient.image}
                className={`${styles.ingredientImage} pl-4 pr-4`}
                alt={ingredient.name}
            />
            <div className={`${styles.price} pt-2 pb-2`}>
                <p className="text text_type_digits-default">
                    {ingredient.price}
                </p>
                <CurrencyIcon type="primary" />
            </div>
            <p className="text text_type_main-default">{ingredient.name}</p>
        </div>
    );
};

IngredientCard.propTypes = {
    ingredient: PropTypes.shape({
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
    }).isRequired,
    onClick: PropTypes.func.isRequired
}

export default IngredientCard;