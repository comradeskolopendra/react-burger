import IngredientCard from "./ingredient-card/ingredient-card";
import styles from "./ingredients-wrapper.module.css";

const IngredientsWrapper = ({ title, ingredients }) => {
    return (
        <>
            <h3 className="text text_type_main-medium">{title}</h3>
            <div className={`${styles.wrapper} pl-4 pr-4 pt-6 pb-10`}>
                {ingredients.map((ingredient) => (
                    <IngredientCard key={ingredient._id} ingredient={ingredient} />
                ))}
            </div>
        </>
    );
};

export default IngredientsWrapper;