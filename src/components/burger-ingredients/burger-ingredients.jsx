import { useState } from "react";

import IngredientsWrapper from "./ingredients-wrapper/ingredients-wrapper";
import TabsWrapper from "./tabs-wrapper/tabs-wrapper";

import styles from "./burger-ingredients.module.css";

const BurgerIngredients = ({ ingredients, handleIngredientClick }) => {
    const [current, setCurrent] = useState("buns");

    const buns = ingredients.filter((ingredient) => ingredient.type === "bun");
    const sauces = ingredients.filter(
        (ingredient) => ingredient.type === "sauce"
    );
    const mains = ingredients.filter(
        (ingredient) => ingredient.type === "main"
    );

    const tabsInfo = [
        {
            value: "buns",
            title: "Булки",
        },
        {
            value: "sauce",
            title: "Соусы",
        },
        {
            value: "main",
            title: "Начинки",
        },
    ];
    return (
        <div className={styles.wrapper}>
            <TabsWrapper
                tabsInfo={tabsInfo}
                current={current}
                updateCurrent={setCurrent}
            />
            <section className={styles.ingredients}>
                <IngredientsWrapper
                    onClick={handleIngredientClick}
                    title={"Булки"}
                    ingredients={buns}
                />
                <IngredientsWrapper
                    onClick={handleIngredientClick}
                    title={"Соусы"}
                    ingredients={sauces}
                />
                <IngredientsWrapper
                    onClick={handleIngredientClick}
                    title={"Начинки"}
                    ingredients={mains}
                />
            </section>
        </div>
    );
};

export default BurgerIngredients;
