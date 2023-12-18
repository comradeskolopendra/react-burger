import { useMemo, FC } from "react";

import { useAppSelector } from '../../../../services/hooks/hooks';
import { getStateSelectedBun, getStateSelectedIngredients } from '../../../../selectors/constructor-selectors';
import {
    CurrencyIcon,
    Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./price-info.module.css";
import { getStateUser } from '../../../../selectors/profile-selector';
import { useNavigate } from 'react-router-dom';
import { TConstructorIngredient } from "../../../../utils/types";

interface IPriceInfo {
    onOpenModal: () => void;
}

const PriceInfo: FC<IPriceInfo> = ({ onOpenModal }) => {
    const navigate = useNavigate();
    const selectedBun = useAppSelector(getStateSelectedBun);
    const selectedIngredients = useAppSelector(getStateSelectedIngredients);
    const user = useAppSelector(getStateUser);

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
                data-testid={"order"}
            >
                Оформить заказ
            </Button>
        </section>
    );
};

export default PriceInfo;
