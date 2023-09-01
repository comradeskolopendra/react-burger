import EnergyItem from "./energy-item/energy-item";

import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./ingredient-details.module.css";
import "@ya.praktikum/react-developer-burger-ui-components";

const IngredientDetails = ({ changeVisibility, ingredient }) => {
    return (
        <div className={styles.modalBlock}>
            <div>
                <div className={styles.wrapperHeading}>
                    <h3 className="text text_type_main-large">
                        Детали игредиента
                    </h3>
                    <button
                        className={styles.closeButton}
                        onClick={() => changeVisibility(false)}
                    >
                        <CloseIcon type={"primary"} />
                    </button>
                </div>
                <div className={`${styles.wrapperBody} ml-15 mr-15`}>
                    <img src={ingredient.image_large} alt={ingredient.name} />
                    <p
                        style={{ textAlign: "center" }}
                        className="text text_type_main-medium pt-4 pb-8"
                    >
                        {ingredient.name}
                    </p>
                    <div className={styles.energyItems}>
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
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IngredientDetails;
