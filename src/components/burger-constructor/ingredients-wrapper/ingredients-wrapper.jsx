import { useContext } from "react";
import { BurgerContext } from "../../../context/context";
import {
    DragIcon,
    ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { ingrediensWrapperTypes } from "../../../utils/types";

import { v4 as uuid4 } from "uuid";
import styles from "./ingredients-wrapper.module.css";

const IngredientsWrapper = ({ dispatch }) => {
    const { constructorData, setConstructorData } = useContext(BurgerContext);
    const handleClose = (ingredient) => {
        setConstructorData(
            [...constructorData].filter(item => item._id !== ingredient._id)
        );
        dispatch({ type: "delete", payload: ingredient.price });
    };
    return (
        <ul className={`${styles.ingredientsWrapper}`}>
            {constructorData.map((ingredient) => (
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
    );
};

IngredientsWrapper.propTypes = ingrediensWrapperTypes;

export default IngredientsWrapper;
