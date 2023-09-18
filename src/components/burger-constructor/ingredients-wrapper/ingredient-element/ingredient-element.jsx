import { useRef } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { useDrag, useDrop } from "react-dnd";
import { removeConstructorIngredient } from "../../../../services/store/ingredients";
import {
    DragIcon,
    ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { ingredientType } from "../../../../utils/types";
import styles from "./ingredient-element.module.css";

const IngredientElement = ({ ingredient, index, moveCard }) => {
    const ref = useRef(null);
    const dispatch = useDispatch();

    const handleClose = (ingredient) => {
        dispatch(removeConstructorIngredient(ingredient.uuid));
    };

    const [{ handlerId }, drop] = useDrop({
        accept: "element",
        collect: monitor => ({
            handlerId: monitor.getHandlerId()
        }),
        hover(item, monitor) {
            if (!ref.current) {
                return;
            }

            const dragIndex = item.index;
            const hoverIndex = index;

            if (dragIndex === hoverIndex) {
                return;
            }

            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;

            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }

            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }

            moveCard(dragIndex, hoverIndex);

            item.index = hoverIndex;
        }
    })

    const [{ isDragging }, drag] = useDrag({
        type: "element",
        item: () => {
            return { id: ingredient.uuid, index }
        },
        collect: monitor => ({
            isDragging: monitor.isDragging()
        })
    })

    const opacity = isDragging ? 0.5 : 1

    drag(drop(ref))

    return (
        <li style={{ opacity }} ref={ref} className={styles.ingredient} data-handler-id={handlerId}>
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
    );
}

IngredientElement.propTypes = {
    ingredient: ingredientType,
    index: PropTypes.number
}

export default IngredientElement;