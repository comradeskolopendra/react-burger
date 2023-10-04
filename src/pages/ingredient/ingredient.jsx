import { useMemo } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getStateIngredients } from "../../selectors/ingredients-selectors";

import EnergyItem from '../main/ingredient-details/energy-item/energy-item';

import styles from "./ingredient.module.css";

const IngredientPage = () => {
    const { id } = useParams();
    const ingredients = useSelector(getStateIngredients);

    const currentIngredient = useMemo(
        () => ingredients.find((ingredient) => ingredient._id === id),
        [ingredients, id]
    );

    return (
        <section>
            <div className={`${styles.wrapperHeading} mt-8`}>
                <h3 className={`text text_type_main-large ${styles.heading}`}>Детали игредиента</h3>
            </div>
            <div className={`${styles.wrapperBody} ml-15 mr-15`}>
                <img
                    src={currentIngredient.image_large}
                    alt={currentIngredient.name}
                />
                <p
                    className={`${styles.ingredientName} text text_type_main-medium pt-4 pb-8`}
                >
                    {currentIngredient.name}
                </p>
                <section className={styles.energyItems}>
                    <EnergyItem
                        title={"Калории,ккал"}
                        value={currentIngredient.calories}
                    />
                    <EnergyItem
                        title={"Белки, г"}
                        value={currentIngredient.proteins}
                    />
                    <EnergyItem
                        title={"Жиры, г"}
                        value={currentIngredient.fat}
                    />
                    <EnergyItem
                        title={"Углеводы, г"}
                        value={currentIngredient.carbohydrates}
                    />
                </section>
            </div>
        </section>
    );
};

export default IngredientPage;
