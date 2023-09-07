import { useMemo, useState, useContext } from "react";
import {v4 as uuidv4} from "uuid";

import IngredientsSection from "./ingredients-section/ingredients-section";
import TabsWrapper from "./tabs-wrapper/tabs-wrapper";
import { BurgerContext } from "../../context/context";
import { burgerSidesTypes } from "../../utils/types";

import styles from "./burger-ingredients.module.css";

const BurgerIngredients = ({ onOpenModal }) => {
    const [current, setCurrent] = useState("buns");

    const { ingredients, constructorData, setConstructorData } =
        useContext(BurgerContext);

    const handleOnClick = (ingredient) => {
        onOpenModal(ingredient);
        if (ingredient.type !== "bun") {
            return setConstructorData([
                ...constructorData,
                {...ingredient, uuid: uuidv4()},
            ]);
        }
        return setConstructorData([
            ...constructorData.filter((element) => element.type !== "bun"),
            ingredient,
        ]);
    };

    const { mains, sauces, buns } = useMemo(() => {
        return {
            mains: ingredients.filter(
                (ingredient) => ingredient.type === "main"
            ),
            sauces: ingredients.filter(
                (ingredient) => ingredient.type === "sauce"
            ),
            buns: ingredients.filter((ingredient) => ingredient.type === "bun"),
        };
    }, [ingredients]);

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
                <IngredientsSection
                    onClick={handleOnClick}
                    title={"Булки"}
                    ingredients={buns}
                />
                <IngredientsSection
                    onClick={handleOnClick}
                    title={"Соусы"}
                    ingredients={sauces}
                />
                <IngredientsSection
                    onClick={handleOnClick}
                    title={"Начинки"}
                    ingredients={mains}
                />
            </section>
        </div>
    );
};

BurgerIngredients.propTypes = burgerSidesTypes;

export default BurgerIngredients;
