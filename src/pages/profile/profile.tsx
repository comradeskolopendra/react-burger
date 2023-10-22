import { FC } from "react";
import { Outlet, NavLink } from "react-router-dom";

import styles from "./profile.module.css";

const ProfileWrapper: FC = () => {
    return (
        <section className={`${styles.contentWrapper} mt-30`}>
            <section className={`${styles.navWrapper} pr-20`}>
                <nav className={`${styles.nav}`}>
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
                <div className={`mt-25`}>
                    <p
                        className={`text text_type_main-default text_color_inactive`}
                    >
                        В этом разделе вы можете изменить свои персональные
                        данные
                    </p>
                </div>
            </section>
            <Outlet />
        </section>
    );
};

export default ProfileWrapper;
