import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./burger-constructor.module.css";

const BurgerConstructor = ({ ingredients }) => {
    return (
        <section className={`${styles.wrapper} pb-10`}>
            <ConstructorElement
                type="top"
                isLocked={true}
                price={200}
                text="Краторная булка N-200i (верх)"
                thumbnail="https://code.s3.yandex.net/react/code/bun-02.png"
            />

            <div className={styles.ingredientsWrapper}>
                {
                    ingredients.map((ingredient) => (
                        <ConstructorElement
                            isLocked={false}
                            price={ingredient.price}
                            thumbnail={ingredient.image}
                            text={ingredient.name}
                        />
                    ))
                }
            </div>

            <ConstructorElement
                type="bottom"
                isLocked={true}
                price={200}
                text="Краторная булка N-200i (низ)"
                thumbnail="https://code.s3.yandex.net/react/code/bun-02.png"
            />
        </section>
    );
};

export default BurgerConstructor;