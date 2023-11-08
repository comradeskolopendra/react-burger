import { FC } from "react";
import styles from "./order-footer.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

interface IOrderFooter {
    date: string;
    price: number;
}

const OrderFooter: FC<IOrderFooter> = ({ date, price }) => {
    return (
        <section className={`${styles.footer} mt-10`}>
            <p className={"text text_type_main-default text_color_inactive"}>{new Date(date).toLocaleDateString()}</p>

            <div className={styles.price}>
                <p className="mr-4 text text_type_digits-default">{price}</p>
                <CurrencyIcon type="primary" />
            </div>
        </section>
    )
}

export default OrderFooter;