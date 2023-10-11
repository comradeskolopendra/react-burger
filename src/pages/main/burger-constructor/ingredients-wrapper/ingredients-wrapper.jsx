import { useCallback } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { useDrop } from "react-dnd/dist/hooks";
import IngredientElement from "./ingredient-element/ingredient-element";

import { sortConstuctorIngredient, setConstructorIngredient } from '../../../../services/store/constructor';

import { ingredientType } from '../../../../utils/types';

import { v4 as uuid4 } from "uuid";
import styles from "./ingredients-wrapper.module.css";

const IngredientsWrapper = ({ ingredients }) => {
    const dispatch = useDispatch();

    const [{ isHoverIngredient }, ingredientsRef] = useDrop({
        accept: "ingredients",
        drop: (item, monitor) => {
            dispatch(setConstructorIngredient({ ...item.ingredient, uuid: uuid4() }))
        },
        collect: monitor => ({
            isHoverIngredient: monitor.isOver()
        })
    })

    const moveCard = useCallback((dragIndex, hoverIndex) => {
        dispatch(sortConstuctorIngredient({ dragIndex, hoverIndex }))
    }, [])

    return (
        <div ref={ingredientsRef}>
            {ingredients.length === 0 ?
                <div className={`${styles.nullIngredients} ${isHoverIngredient ? styles.selectedIngredient : ""} text text_type_main-small`}>
                    Попробуйте перетащить ингредиент!
                </div>
                :
                <ul className={`${styles.ingredientsWrapper}`}>
                    {ingredients.map((ingredient, index) => (
                        <IngredientElement key={ingredient.uuid} ingredient={ingredient} index={index} moveCard={moveCard} />
                    ))}
                </ul>
            }
        </div>
    );
};

IngredientsWrapper.propTypes = {
    ingredients: PropTypes.arrayOf(ingredientType)
};

export default IngredientsWrapper;
