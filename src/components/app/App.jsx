import AppHeader from "../app-header/app-header";

import "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./app.module.css";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";

function App() {
    return (
        <div>
            <AppHeader />
            <main className={styles.main}>
                <h1 className="text text_type_main-large mt-10 mb-5">
                    Соберите бургер
                </h1>

                <div className={styles.wrapper}>
                    <BurgerIngredients />
                </div>
            </main>
        </div>
    );
}

export default App;
