import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { getStateIngredients } from '../../selectors/ingredients-selectors';
import PropTypes from "prop-types";

import IngredientsSection from "./ingredients-section/ingredients-section";
import TabsWrapper from "./tabs-wrapper/tabs-wrapper";

import styles from "./burger-ingredients.module.css";

const BurgerIngredients = ({ onOpenModal }) => {
    const [current, setCurrent] = useState("buns");

    const ingredients = useSelector(getStateIngredients);

    const handleOnClick = (ingredient) => {
        onOpenModal(ingredient);
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
        </div >
    );
};

BurgerIngredients.propTypes = {
    onOpenModal: PropTypes.func.isRequired,
};

export default BurgerIngredients;
