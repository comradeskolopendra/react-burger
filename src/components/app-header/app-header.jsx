import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./app-header.module.css";
import NavLink from "./nav-link/nav-link";

const AppHeader = () => {
    return (
        <header>
            <nav className={`${styles.nav} mt-4 mb-4`}>
                <div className={styles.sideWrapper}>
                    <NavLink
                        to={"#"}
                        icon={"burger"}
                        isActive={true}
                        title={"Конструктор"}
                    />
                    <NavLink
                        to={"#"}
                        icon={"list"}
                        isActive={false}
                        title={"Лента заказов"}
                    />
                </div>

                <Logo />

                <div className={styles.sideWrapper}>
                    <NavLink
                        to={"#"}
                        icon={"profile"}
                        isActive={false}
                        title={"Личный кабинет"}
                    />
                </div>
            </nav>
        </header>
    );
};

export default AppHeader;
