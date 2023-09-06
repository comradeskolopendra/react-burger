import styles from "./modal-overlay.module.css";
import { modalOverlayTypes } from '../../utils/types';

const ModalOverlay = ({ onClose }) => {
    return (
        <div className={styles.overlay} onClick={onClose} />
    );
};

ModalOverlay.propTypes = modalOverlayTypes;

export default ModalOverlay;
