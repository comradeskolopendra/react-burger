import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";

import { NavLink } from "react-router-dom";

import styles from "./custom-nav-link.module.css";
import {
    BurgerIcon,
    ListIcon,
    ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

const CustomNavLink = ({ to, icon, title }) => {
    const location = useLocation();

    return (
        <NavLink
            to={to}
            end
            className={({ isActive }) => {
                return isActive ? `${styles.link} text text_type_main-default ${styles.textColorActive}` : `${styles.link} text text_type_main-default text_color_inactive`
            }}
        >
            {icon === "burger" && <BurgerIcon type={location.pathname === to ? "primary" : "secondary"} />}
            {icon === "profile" && <ProfileIcon type={location.pathname === to ? "primary" : "secondary"} />}
            {icon === "list" && <ListIcon type={location.pathname === to ? "primary" : "secondary"} />}
            {title}
        </NavLink>
    );
};

NavLink.propTypes = {
    to: PropTypes.string.isRequired,
    icon: PropTypes.string,
    title: PropTypes.string.isRequired,
};

export default CustomNavLink;
