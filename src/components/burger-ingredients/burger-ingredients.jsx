import { useMemo, useState, useContext } from "react";
import PropTypes from "prop-types";

import IngredientsSection from "./ingredients-section/ingredients-section";
import TabsWrapper from "./tabs-wrapper/tabs-wrapper";
import { BurgerIngredientsContext } from '../../context/burgerContext';

import styles from "./burger-ingredients.module.css";

const BurgerIngredients = ({ handleIngredientClick }) => {
    const [current, setCurrent] = useState("buns");

    const { ingredients } = useContext(BurgerIngredientsContext);

    const { mains, sauces, buns } = useMemo(() => {
        return {
            mains: ingredients.filter((ingredient) => ingredient.type === "main"),
            sauces: ingredients.filter((ingredient) => ingredient.type === "sauce"),
            buns: ingredients.filter((ingredient) => ingredient.type === "bun")
        };
    }, [ingredients])

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
                    onClick={handleIngredientClick}
                    title={"Булки"}
                    ingredients={buns}
                />
                <IngredientsSection
                    onClick={handleIngredientClick}
                    title={"Соусы"}
                    ingredients={sauces}
                />
                <IngredientsSection
                    onClick={handleIngredientClick}
                    title={"Начинки"}
                    ingredients={mains}
                />
            </section>
        </div>
    );
};

BurgerIngredients.propTypes = {
    ingredients: PropTypes.arrayOf(PropTypes.shape({
        __v: PropTypes.number,
        _id: PropTypes.string,
        calories: PropTypes.number,
        carbohydrates: PropTypes.number,
        fat: PropTypes.number,
        image: PropTypes.string,
        image_large: PropTypes.string,
        image_mobile: PropTypes.string,
        name: PropTypes.string,
        price: PropTypes.number,
        proteins: PropTypes.number,
        type: PropTypes.string
    }).isRequired).isRequired,
    handleIngredientClick: PropTypes.func.isRequired
}

export default BurgerIngredients;
