import { useRef, FC } from "react";
import { useDispatch } from "react-redux";
import { useDrag, useDrop } from "react-dnd";
import { removeConstructorIngredient } from '../../../../../services/store/constructor';
import {
    DragIcon,
    ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { TConstructorIngredient } from '../../../../../utils/types';
import styles from "./ingredient-element.module.css";

interface IIngredientElement {
    ingredient: TConstructorIngredient;
    index: number;
    moveCard: (dragIndex: number, hoverIndex: number) => void;
}

interface IDragableItem {
    id: string;
    index: number;
}

const IngredientElement: FC<IIngredientElement> = ({ ingredient, index, moveCard }) => {
    const ref = useRef<HTMLLIElement>(null);
    const dispatch = useDispatch();

    const handleClose = (ingredient: TConstructorIngredient) => {
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

            const dragIndex = (item as IDragableItem).index;
            const hoverIndex = index;

            if (dragIndex === hoverIndex) {
                return;
            }

            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = clientOffset!.y - hoverBoundingRect.top;

            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }

            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }

            moveCard(dragIndex, hoverIndex);

            (item as IDragableItem).index = hoverIndex;
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

    drag(drop(ref))

    return (
        <li ref={ref} className={styles.ingredient} data-handler-id={handlerId}>
            <div className="mr-2">
                <DragIcon type="primary" />
            </div>
            <ConstructorElement
                isLocked={false}
                price={ingredient.price}
                handleClose={() => handleClose(ingredient)}
                thumbnail={ingredient.image}
                text={ingredient.name}
                extraClass={isDragging ? styles.dragging : ""}
            />
        </li>
    );
}

export default IngredientElement;