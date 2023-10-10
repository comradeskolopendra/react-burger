import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./app-header.module.css";
import CustomNavLink from "./custom-nav-link/custom-nav-link";

const AppHeader = () => {
    return (
        <header>
            <nav className={`${styles.nav} mt-4 mb-4`}>
                <div className={styles.sideWrapper}>
                    <CustomNavLink
                        to={"/"}
                        icon={"burger"}
                        title={"Конструктор"}
                        end={true}
                    />
                    <CustomNavLink
                        to={"/lenta"}
                        icon={"list"}
                        title={"Лента заказов"}
                        end={true}
                    />
                </div>

                <Logo />

                <div className={styles.sideWrapper}>
                    <CustomNavLink
                        to={"/profile"}
                        icon={"profile"}
                        title={"Личный кабинет"}
                        end={false}
                    />
                </div>
            </nav>
        </header>
    );
};

export default AppHeader;
