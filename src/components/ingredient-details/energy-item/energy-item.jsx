import PropTypes from "prop-types";
import styles from "./energy-item.module.css";

const EnergyItem = ({ title, value }) => {
    return (
        <div className={styles.energyItem}>
            <p className="text text_type_main-default">{title}</p>
            <span className="text text_type_digits-default">
                {value}
            </span>
        </div>
    );
};

EnergyItem.propTypes = {
    title: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired
}

export default EnergyItem;