import IngredientCard from "./ingredient-card/ingredient-card";

import { ingredientsSectionTypes } from '../../../utils/types';
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

IngredientsSection.propTypes = ingredientsSectionTypes;

export default IngredientsSection;