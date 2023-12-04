import { FC } from "react";
import IngredientCircle from "../../../../components/ingredient-circle/ingredient-circle";
import styles from "./composition-row.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

interface ICompositionRow {
    amount: number | undefined;
    price: number | undefined;
    name: string | undefined;
    image: string | undefined;
}

const CompositionRow: FC<ICompositionRow> = ({ name, price, amount, image }) => {

    return (<div className={styles.row}>
        <div className={styles.rowLefside}>
            <IngredientCircle src={image} restAmount={0} index={0} isLast={false} />
            <h3 className={`${styles.title} ml-4 mr-4 text text_type_main-default`}>{name}</h3>
        </div>

        <div className={styles.rowRightside}>
            <p className="text text_type_digits-default mr-2">{amount} x {price}</p>
            <CurrencyIcon type="primary" />
        </div>
    </div>);
};

export default CompositionRow;