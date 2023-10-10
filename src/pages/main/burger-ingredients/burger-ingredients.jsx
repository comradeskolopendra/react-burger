import { useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { getStateIngredients } from '../../../selectors/ingredients-selectors';
import PropTypes from "prop-types";

import IngredientsSection from "./ingredients-section/ingredients-section";
import TabsWrapper from "./tabs-wrapper/tabs-wrapper";

import styles from "./burger-ingredients.module.css";

const BurgerIngredients = () => {
    const [current, setCurrent] = useState("buns");
    const bunRef = useRef(null);
    const sauceRef = useRef(null);
    const mainRef = useRef(null);
    const ingredientsRef = useRef(null);

    const ingredients = useSelector(getStateIngredients);

    const handleScroll = () => {
        if (sauceRef.current.getBoundingClientRect().top < 0) {
            return setCurrent("mains")
        }
        if (bunRef.current.getBoundingClientRect().top < 10) {
            return setCurrent("sauces");
        }

        return setCurrent("buns")
    }

    const scrollToBlock = (value) => {
        setCurrent(value);
        if (value === "buns") {
            ingredientsRef.current.scrollTo({ top: 0, behavior: "smooth" })
        } else if (value === "sauces") {
            ingredientsRef.current.scrollTo({ top: bunRef.current.scrollHeight, behavior: "smooth" })
        } else if (value === "mains") {
            ingredientsRef.current.scrollTo({ top: bunRef.current.scrollHeight + sauceRef.current.scrollHeight, behavior: "smooth" })
        }
    }

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
            value: "sauces",
            title: "Соусы",
        },
        {
            value: "mains",
            title: "Начинки",
        },
    ];

    return (
        <div className={styles.wrapper}>
            <TabsWrapper
                tabsInfo={tabsInfo}
                current={current}
                updateCurrent={scrollToBlock}
            />
            <section
                ref={ingredientsRef}
                className={styles.ingredients}
                onScroll={handleScroll}
            >
                <IngredientsSection
                    title={"Булки"}
                    ingredients={buns}
                    ref={bunRef}
                />
                <IngredientsSection
                    title={"Соусы"}
                    ingredients={sauces}
                    ref={sauceRef}
                />
                <IngredientsSection
                    title={"Начинки"}
                    ingredients={mains}
                    ref={mainRef}
                />
            </section>
        </div>
    );
};

export default BurgerIngredients;
