import ReactDOM from "react-dom";
import styles from "./modal-overlay.module.css";

const ModalOverlay = ({ children, handleBackgroundClick }) => {
    return (
        <div className={styles.overlay} onClick={handleBackgroundClick}>
            {children}
        </div>
    );
};

export default ModalOverlay;
