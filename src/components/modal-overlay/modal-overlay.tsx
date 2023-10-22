import styles from "./modal-overlay.module.css";
import { FC } from "react";

interface IModalOverlay {
    onClose: () => void;
}

const ModalOverlay: FC<IModalOverlay> = ({ onClose }) => {
    return (
        <div className={styles.overlay} onClick={onClose} />
    );
};

export default ModalOverlay;
