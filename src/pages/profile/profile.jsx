import { Outlet, NavLink } from "react-router-dom";
import styles from "./profile.module.css";

const ProfileWrapper = () => {
    return (
        <section className={`${styles.contentWrapper} mt-30`}>
            <section>
                <nav className={`${styles.nav} pr-20`}>
                    <NavLink
                        to={""}
                        end
                        className={({ isActive }) =>
                            isActive
                                ? `text text_type_main-medium ${styles.activeLink}`
                                : `text text_type_main-medium ${styles.link} text_color_inactive`
                        }
                    >
                        Профиль
                    </NavLink>

                    <NavLink
                        to={"orders"}
                        end
                        className={({ isActive }) =>
                            isActive
                                ? `text text_type_main-medium ${styles.activeLink}`
                                : `text text_type_main-medium ${styles.link} text_color_inactive`
                        }
                    >
                        История заказов
                    </NavLink>

                    <NavLink
                        to={"quit"}
                        end
                        className={({ isActive }) =>
                            isActive
                                ? `text text_type_main-medium ${styles.activeLink}`
                                : `text text_type_main-medium ${styles.link} text_color_inactive`
                        }
                    >
                        Выход
                    </NavLink>
                </nav>
            </section>
            <Outlet />
        </section>
    );
};

export default ProfileWrapper;
