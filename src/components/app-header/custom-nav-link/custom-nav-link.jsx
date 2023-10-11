import PropTypes from "prop-types";

import { NavLink } from "react-router-dom";

import styles from "./custom-nav-link.module.css";
import {
    BurgerIcon,
    ListIcon,
    ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

const CustomNavLink = ({ to, icon, title, end }) => {
    return (
        <NavLink
            to={to}
            className={({ isActive }) => isActive
                ? `${styles.link} text text_type_main-default ${styles.activeLink}`
                : `${styles.link} text text_type_main-default text_color_inactive`
            }
            state={{ from: { pathname: to } }}
            end={end}
        >
            {icon === "burger" && <BurgerIcon type={"secondary"} />}
            {icon === "profile" && <ProfileIcon type={"secondary"} />}
            {icon === "list" && <ListIcon type={"secondary"} />}
            {title}
        </NavLink>
    );
};

CustomNavLink.propTypes = {
    to: PropTypes.string.isRequired,
    icon: PropTypes.string,
    title: PropTypes.string.isRequired,
    end: PropTypes.bool.isRequired
};

export default CustomNavLink;
