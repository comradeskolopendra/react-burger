import { useState } from "react";

import TabsWrapper from "./tabs-wrapper/tabs-wrapper";

import styles from "./burger-ingredients.module.css";

const BurgerIngredients = () => {
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
            <TabsWrapper tabsInfo={tabsInfo} current={current} updateCurrent={setCurrent}/>
        </div>
    );
};

export default BurgerIngredients;
