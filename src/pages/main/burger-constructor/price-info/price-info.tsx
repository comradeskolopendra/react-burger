import { useMemo, FC } from "react";

import { useSelector } from "react-redux";
import { getStateSelectedBun, getStateSelectedIngredients } from '../../../../selectors/constructor-selectors';
import {
    CurrencyIcon,
    Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./price-info.module.css";
import { getStateUser } from '../../../../selectors/profile-selector';
import { useNavigate } from 'react-router-dom';
import { IIngredient, IUser, TConstructorIngredient } from "../../../../utils/types";

interface IPriceInfo {
    onOpenModal: () => void;
}

const PriceInfo: FC<IPriceInfo> = ({ onOpenModal }) => {
    const navigate = useNavigate();
    const selectedBun: IIngredient = useSelector(getStateSelectedBun);
    const selectedIngredients: TConstructorIngredient[] = useSelector(getStateSelectedIngredients);
    const user: IUser = useSelector(getStateUser)

    const price = useMemo(() => {
        return selectedIngredients.reduce((prev: number, cur: TConstructorIngredient) => {
            return prev + (cur ? cur.price : 0)
        }, 0) + (selectedBun ? selectedBun.price * 2 : 0)
    }, [selectedIngredients, selectedBun])

    const handleOrder = () => {
        if (user) {
            return onOpenModal()
        }

        return navigate("/login")
    }

    return (
        <section className={styles.orderBlock}>
            <div className={styles.price}>
                <p className="mr-2 text text_type_digits-medium">{price}</p>
                <CurrencyIcon type="primary" />
            </div>

            <Button
                onClick={handleOrder}
                htmlType="button"
                type="primary"
                size="large"
                disabled={!selectedBun}
            >
                Оформить заказ
            </Button>
        </section>
    );
};

export default PriceInfo;
