import { useState } from "react";
import PropTypes from "prop-types";

import { NavLink } from "react-router-dom";

import styles from "./nav-link.module.css";
import {
    BurgerIcon,
    ListIcon,
    ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

const CustomNavLink = ({ to, icon, title }) => {
    const [active, setActive] = useState({
        icon: "secondary",
        class: styles.textColorInactive,
    });

    const handlerOnMouseEnter = () => {
        setActive({ icon: "primary", class: styles.textColorActive });
    };

    const handlerOnMouseLeave = () => {
        setActive({ icon: "secondary", class: styles.textColorInactive });
    };

    return (
        <NavLink
            to={to}
            onMouseLeave={handlerOnMouseLeave}
            onMouseEnter={handlerOnMouseEnter}
            className={`${styles.link} text text_type_main-default ${active.class}`}
        >
            {icon === "burger" && <BurgerIcon type={active.icon} />}
            {icon === "profile" && <ProfileIcon type={active.icon} />}
            {icon === "list" && <ListIcon type={active.icon} />}
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
