import { FC } from "react";
import styles from "./ingredient-circle.module.css";

interface IIngredientCirlce {
    src: string | undefined;
    isLast: boolean;
    index: number;
    restAmount: number;
}

const IngredientCircle: FC<IIngredientCirlce> = ({
    src,
    isLast,
    index,
    restAmount,
}) => {
    return (
        <div
            className={`${isLast && styles.lastCircle} ${styles.circle}`}
            style={{ left: 0 - index * 20 }}
        >
            {isLast && (
                <div className={styles.overlay}>
                    <p className='text text_type_main-medium'>+{restAmount}</p>
                </div>
            )}
            <img className={styles.ingredient} src={src} alt="ingredient" />
        </div>
    );
};

export default IngredientCircle;
