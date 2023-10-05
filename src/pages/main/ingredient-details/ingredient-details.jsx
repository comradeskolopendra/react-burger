import PropTypes from "prop-types";
import { useParams } from "react-router-dom";

import EnergyItem from "./energy-item/energy-item";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./ingredient-details.module.css";
import { useSelector } from "react-redux";
import { getStateIngredients } from "../../../selectors/ingredients-selectors";
import { useEffect, useMemo, useState } from "react";

const IngredientDetails = ({ onClose }) => {
    const { id } = useParams();
    const ingredients = useSelector(getStateIngredients);
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        console.log(
            ingredients,
            id
        )
    })

    const selectedIngredient = useMemo(() => {
        if (ingredients.length === 0) {
            setIsLoading(true);
            return null;
        }

        setIsLoading(false);

        return ingredients.find(element => element._id === id)
    }, [ingredients])


    return (
        <section className={styles.modalBlock}>
            {isLoading && !selectedIngredient ? "Идет загрузка" : <>
                <div className={styles.wrapperHeading}>
                    <h3 className="text text_type_main-large">Детали игредиента</h3>
                    <button
                        className="closeButton"
                        onClick={onClose}
                    >
                        <CloseIcon type={"primary"} />
                    </button>
                </div>
                <div className={`${styles.wrapperBody} ml-15 mr-15`}>
                    <img
                        src={
                            selectedIngredient.image_large}
                        alt={
                            selectedIngredient.name}
                    />
                    <p
                        className={`${styles.ingredientName} text text_type_main-medium pt-4 pb-8`}
                    >
                        {
                            selectedIngredient.name}
                    </p>
                    <section className={styles.energyItems}>
                        <EnergyItem
                            title={"Калории,ккал"}
                            value={
                                selectedIngredient.calories}
                        />
                        <EnergyItem
                            title={"Белки, г"}
                            value={
                                selectedIngredient.proteins}
                        />
                        <EnergyItem
                            title={"Жиры, г"}
                            value={
                                selectedIngredient.fat}
                        />
                        <EnergyItem
                            title={"Углеводы, г"}
                            value={
                                selectedIngredient.carbohydrates}
                        />
                    </section>
                </div>
            </>
            }
        </section>
    );
};

IngredientDetails.propTypes = {
    onClose: PropTypes.func.isRequired,
};

export default IngredientDetails;
