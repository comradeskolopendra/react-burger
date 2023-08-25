import styles from "./nav-link.module.css";
import {
    BurgerIcon,
    ListIcon,
    ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

const NavLink = ({ to, icon, title, isActive }) => {
    const getIconByType = () => {
        switch (icon) {
            case "burger":
                return <BurgerIcon type="primary" />;

            case "profile":
                return <ProfileIcon type="secondary" />;

            case "list":
                return <ListIcon type="secondary" />;

            default:
                break;
        }
    };

    return (
        <a href={to} className={styles.link}>
            {getIconByType(icon)}
            <p
                className={`text secondary text_type_main-default ${
                    isActive ? "" : "text_color_inactive"
                }`}
            >
                {title}
            </p>
        </a>
    );
};

export default NavLink;
