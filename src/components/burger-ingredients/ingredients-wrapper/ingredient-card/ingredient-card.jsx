import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./ingredient-card.module.css";

const IngredientCard = ({ ingredient }) => {
    return (
        <div key={ingredient._id} className={styles.card}>
            <img src={ingredient.image} className={`${styles.ingredientImage} pl-4 pr-4`} alt={ingredient.name} />
            <div className={`${styles.price} pt-2 pb-2`}>
                <p className="text text_type_digits-default">{ingredient.price}</p>
                <CurrencyIcon type="primary" />
            </div>
            <p className="text text_type_main-default">{ingredient.name}</p>
        </div>
    );
};

export default IngredientCard;