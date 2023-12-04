import { FC } from "react";
import { useCallback } from "react";

import { useAppDispatch } from '../../../../services/hooks/hooks';
import { useDrop } from "react-dnd/dist/hooks";
import IngredientElement from "./ingredient-element/ingredient-element";

import { sortConstuctorIngredient, setConstructorIngredient } from '../../../../services/store/constructor';

import { IIngredient, TConstructorIngredient } from '../../../../utils/types';

import { v4 as uuid4 } from "uuid";
import styles from "./ingredients-wrapper.module.css";

interface IIngredientsWrapper {
    ingredients: TConstructorIngredient[];
}

const IngredientsWrapper: FC<IIngredientsWrapper> = ({ ingredients }) => {

    const dispatch = useAppDispatch();

    const [{ isHoverIngredient }, ingredientsRef] = useDrop({
        accept: "ingredients",
        drop: (item: IIngredient, monitor) => {
            dispatch(setConstructorIngredient({ ...item, uuid: uuid4() }))
        },
        collect: monitor => ({
            isHoverIngredient: monitor.isOver()
        })
    })

    const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
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
                    {ingredients.map((ingredient: TConstructorIngredient, index: number) => (
                        <IngredientElement key={ingredient.uuid} ingredient={ingredient} index={index} moveCard={moveCard} />
                    ))}
                </ul>
            }
        </div>
    );
};

export default IngredientsWrapper;
