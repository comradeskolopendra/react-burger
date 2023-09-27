import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./app-header.module.css";
import CustomNavLink from "./nav-link/nav-link";

const AppHeader = () => {
    return (
        <header>
            <nav className={`${styles.nav} mt-4 mb-4`}>
                <div className={styles.sideWrapper}>
                    <CustomNavLink
                        to={"#"}
                        icon={"burger"}
                        title={"Конструктор"}
                    />
                    <CustomNavLink
                        to={"/login"}
                        icon={"list"}
                        title={"Лента заказов"}
                    />
                </div>

                <Logo />

                <div className={styles.sideWrapper}>
                    <CustomNavLink
                        to={"#"}
                        icon={"profile"}
                        title={"Личный кабинет"}
                    />
                </div>
            </nav>
        </header>
    );
};

export default AppHeader;
