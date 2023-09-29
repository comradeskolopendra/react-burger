import { Outlet, NavLink } from "react-router-dom";
import styles from "./profile.module.css";

const ProfileWrapper = () => {
    return (
        <>
            <section>
                <nav className={styles.nav}>
                    <NavLink
                        to={""}
                        end
                        className={({ isActive }) =>
                            isActive
                                ? `text text_type_main-medium ${styles.activeLink}`
                                : `text text_type_main-medium ${styles.link} text_color_inactive`
                        }
                    >
                        Profile-editable
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
                        Order-history
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
                        Quit
                    </NavLink>
                </nav>
            </section>
            <Outlet />
        </>
    );
};

export default ProfileWrapper;
