import { useState } from "react";

import IngredientsWrapper from "./ingredients-wrapper/ingredients-wrapper";
import TabsWrapper from "./tabs-wrapper/tabs-wrapper";

import styles from "./burger-ingredients.module.css";

const BurgerIngredients = ({ buns, sauces, mains }) => {
    const [current, setCurrent] = useState("buns");

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
            <TabsWrapper tabsInfo={tabsInfo} current={current} updateCurrent={setCurrent} />
            <section className={styles.ingredients}>
                <IngredientsWrapper title={"Булки"} ingredients={buns} />
                <IngredientsWrapper title={"Соусы"} ingredients={sauces} />
                <IngredientsWrapper title={"Начинки"} ingredients={mains} />
            </section>
        </div>
    );
};

export default BurgerIngredients;
