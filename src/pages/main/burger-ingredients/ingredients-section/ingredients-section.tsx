import React, { MutableRefObject } from "react";

import IngredientCard from "./ingredient-card/ingredient-card";

import { IIngredient } from '../../../../utils/types';
import styles from "./ingredients-section.module.css";

interface IIngredientsSection {
    title: string;
    ingredients: IIngredient[];
    ref: MutableRefObject<HTMLElement | null>
}

const IngredientsSection = React.forwardRef<HTMLDivElement, IIngredientsSection>(({ title, ingredients }, ref) => {

    return (
        <div ref={ref}>
            <h3 className="text text_type_main-medium">{title}</h3>
            <div className={`${styles.wrapper} pl-4 pr-4 pt-6 pb-10`}>
                {ingredients.map((ingredient) => (
                    <IngredientCard
                        key={ingredient._id}
                        ingredient={ingredient}
                    />
                ))}
            </div>
        </div>
    );
});

export default IngredientsSection;