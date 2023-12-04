import { useLocation } from "react-router-dom";
import { FC, useEffect, useState } from "react";
import { Outlet, NavLink } from "react-router-dom";

import styles from "./profile.module.css";

const ProfileWrapper: FC = () => {
    const [description, setDescription] = useState("В этом разделе вы можете изменить свои персональные данные")
    const location = useLocation();

    useEffect(() => {
        if (location.pathname === "/profile") {
            setDescription("В этом разделе вы можете изменить свои персональные данные")
        } else if (location.pathname === "/profile/orders") {
            setDescription("В этом разделе вы можете просмотреть свою историю заказов")
        } else {
            setDescription("")
        }
    }, [location.pathname])

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
                        {description}
                    </p>
                </div>
            </section>
            <Outlet />
        </section>
    );
};

export default ProfileWrapper;
