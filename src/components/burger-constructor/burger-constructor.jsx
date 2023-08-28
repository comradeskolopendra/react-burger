import { ConstructorElement, Button, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./burger-constructor.module.css";
import { DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const BurgerConstructor = ({ ingredients }) => {
    return (
        <div className={styles.wrapper}>
            <section className={`${styles.constructor} pb-10 pr-4`}>
                <ConstructorElement
                    type="top"
                    isLocked={true}
                    price={200}
                    text="Краторная булка N-200i (верх)"
                    thumbnail="https://code.s3.yandex.net/react/code/bun-02.png"
                    extraClass="ml-8"
                />

                <ul className={`${styles.ingredientsWrapper}`}>
                    {
                        ingredients.map((ingredient) => (
                            <li key={ingredient._id} style={{ display: "flex", alignItems: "center" }}>
                                <div className="mr-2">
                                    <DragIcon />
                                </div>
                                <ConstructorElement
                                    isLocked={false}
                                    price={ingredient.price}
                                    thumbnail={ingredient.image}
                                    text={ingredient.name}
                                />
                            </li>
                        ))
                    }
                </ul>

                <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    price={200}
                    text="Краторная булка N-200i (низ)"
                    thumbnail="https://code.s3.yandex.net/react/code/bun-02.png"
                    extraClass="ml-8"
                />
            </section>

            <section className={styles.orderBlock}>
                <div className={styles.price}>
                    <p className="mr-2 text text_type_digits-medium">123</p>
                    <CurrencyIcon type="primary" />
                </div>

                <Button htmlType="button" type="primary" size="large">
                    Оформить заказ
                </Button>
            </section>
        </div>
    );
};

export default BurgerConstructor;