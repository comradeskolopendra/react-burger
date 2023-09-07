import PropTypes from "prop-types";

import IngredientCard from "./ingredient-card/ingredient-card";

import { ingredientType } from '../../../utils/types';
import styles from "./ingredients-section.module.css";

const IngredientsSection = ({ title, ingredients, onClick }) => {
    return (
        <>
            <h3 className="text text_type_main-medium">{title}</h3>
            <div className={`${styles.wrapper} pl-4 pr-4 pt-6 pb-10`}>
                {ingredients.map((ingredient) => (
                    <IngredientCard onClick={onClick} key={ingredient._id} ingredient={ingredient} />
                ))}
            </div>
        </>
    );
};

IngredientsSection.propTypes = {
    title: PropTypes.string,
    ingredients: PropTypes.arrayOf(ingredientType).isRequired,
    onClick: PropTypes.func.isRequired,
};

export default IngredientsSection;