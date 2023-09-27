import React from "react";
import PropTypes from "prop-types";

import IngredientCard from "./ingredient-card/ingredient-card";

import { ingredientType } from '../../../../utils/types';
import styles from "./ingredients-section.module.css";

const IngredientsSection = React.forwardRef((props, ref) => {
    const { title, ingredients, onClick } = props;

    return (
        <div ref={ref}>
            <h3 className="text text_type_main-medium">{title}</h3>
            <div className={`${styles.wrapper} pl-4 pr-4 pt-6 pb-10`}>
                {ingredients.map((ingredient) => (
                    <IngredientCard onClick={onClick} key={ingredient._id} ingredient={ingredient} />
                ))}
            </div>
        </div>
    );
});

IngredientsSection.propTypes = {
    title: PropTypes.string,
    ingredients: PropTypes.arrayOf(ingredientType).isRequired,
    onClick: PropTypes.func.isRequired,
};

export default IngredientsSection;