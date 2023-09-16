import { useContext } from "react";
import PropTypes from "prop-types";

import EnergyItem from "./energy-item/energy-item";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ModalContext } from "../../context/context";

import "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./ingredient-details.module.css";

const IngredientDetails = ({ changeVisibility }) => {
    const { currentIngredient } = useContext(ModalContext);
    return (
        <section className={styles.modalBlock}>
            <div className={styles.wrapperHeading}>
                <h3 className="text text_type_main-large">Детали игредиента</h3>
                <button
                    className="closeButton"
                    onClick={() => changeVisibility(false)}
                >
                    <CloseIcon type={"primary"} />
                </button>
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

IngredientDetails.propTypes = {
    changeVisibility: PropTypes.func.isRequired,
};

export default IngredientDetails;
