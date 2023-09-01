import PropTypes from "prop-types";
import styles from "./modal-overlay.module.css";

const ModalOverlay = ({ handleBackgroundClick }) => {
    return (
        <div className={styles.overlay} onClick={handleBackgroundClick} />
    );
};

ModalOverlay.propTypes = {
    handleBackgroundClick: PropTypes.func
}

export default ModalOverlay;
