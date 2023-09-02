import IngredientCard from "./ingredient-card/ingredient-card";
import PropTypes from "prop-types";
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
    }).isRequired).isRequired,
    onClick: PropTypes.func.isRequired
}

export default IngredientsSection;