import PropTypes from "prop-types";
import EnergyItem from "./energy-item/energy-item";

import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./ingredient-details.module.css";
import "@ya.praktikum/react-developer-burger-ui-components";

const IngredientDetails = ({ changeVisibility, ingredient }) => {
    return (
        <section className={styles.modalBlock}>
            <div className={styles.wrapperHeading}>
                <h3 className="text text_type_main-large">
                    Детали игредиента
                </h3>
                <button
                    className="closeButton"
                    onClick={() => changeVisibility(false)}
                >
                    <CloseIcon type={"primary"} />
                </button>
            </div>
            <div className={`${styles.wrapperBody} ml-15 mr-15`}>
                <img src={ingredient.image_large} alt={ingredient.name} />
                <p className={`${styles.ingredientName} text text_type_main-medium pt-4 pb-8`}>
                    {ingredient.name}
                </p>
                <section className={styles.energyItems}>
                    <EnergyItem
                        title={"Калории,ккал"}
                        value={ingredient.calories}
                    />
                    <EnergyItem
                        title={"Белки, г"}
                        value={ingredient.proteins}
                    />
                    <EnergyItem title={"Жиры, г"} value={ingredient.fat} />
                    <EnergyItem
                        title={"Углеводы, г"}
                        value={ingredient.carbohydrates}
                    />
                </section>
            </div>
        </section>
    );
};

IngredientDetails.propTypes = {
    changeVisibility: PropTypes.func,
    ingredient: PropTypes.object
}

export default IngredientDetails;
