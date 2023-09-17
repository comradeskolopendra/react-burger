import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { useDrop } from "react-dnd/dist/hooks";
import {
    DragIcon,
    ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { setConstructorIngredients } from "../../../services/store/ingredients";
import { ingredientType } from "../../../utils/types";

import { v4 as uuid4 } from "uuid";
import styles from "./ingredients-wrapper.module.css";

const IngredientsWrapper = ({ ingredients }) => {
    const dispatch = useDispatch();
    const { constructorIngredients } = useSelector(store => store.ingredients);

    const [{ isHoverIngredient }, ingredientsRef] = useDrop({
        accept: "ingredients",
        drop: (item, monitor) => {
            dispatch(setConstructorIngredients([...constructorIngredients, { ...item.ingredient, uuid: uuid4() }]))
        },
        collect: monitor => ({
            isHoverIngredient: monitor.isOver()
        })
    })

    const handleClose = (ingredient) => {
        dispatch(setConstructorIngredients(
            [...constructorIngredients].filter((item) => item.uuid !== ingredient.uuid))
        );
    };

    return (
        <div ref={ingredientsRef}>
            {ingredients.length === 0 ?
                <div className={`${styles.nullIngredients} ${isHoverIngredient ? styles.selectedIngredient : ""} text text_type_main-small`}>
                    Попробуйте нажать или перетащить ингредиент!
                </div>
                :
                <ul className={`${styles.ingredientsWrapper}`}>
                    {ingredients.map((ingredient) => (
                        <li key={uuid4()} className={styles.ingredient}>
                            <div className="mr-2">
                                <DragIcon />
                            </div>
                            <ConstructorElement
                                isLocked={false}
                                price={ingredient.price}
                                handleClose={() => handleClose(ingredient)}
                                thumbnail={ingredient.image}
                                text={ingredient.name}
                            />
                        </li>
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
