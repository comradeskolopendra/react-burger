import AppHeader from "../app-header/app-header";
import { data } from "../../utils/data";

import "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./app.module.css";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";

function App() {
    const buns = data.filter((element) => element.type === "bun");
    const sauces = data.filter((element) => element.type === "sauce");
    const mains = data.filter((element) => element.type === "main");
    return (
        <div>
            <AppHeader />
            <main className={styles.main}>
                <h1 className="text text_type_main-large mt-10 mb-5">
                    Соберите бургер
                </h1>

                <div className={styles.wrapper}>
                    <BurgerIngredients buns={buns} sauces={sauces} mains={mains} />
                    <BurgerConstructor
                        ingredients={[...mains, ...sauces]}
                    />
                </div>
            </main>
        </div>
    );
}

export default App;
