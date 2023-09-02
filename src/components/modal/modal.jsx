import { useEffect } from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";

import ModalOverlay from "../modal-overlay/modal-overlay";

const Modal = ({ children, onClose, visible, body }) => {
    const handleEscPress = (event) => {
        if (event.key === "Escape") {
            onClose();
        }
    };

    useEffect(() => {
        document.addEventListener("keydown", handleEscPress);
        return () => document.removeEventListener("keydown", handleEscPress)
    }, [])

    useEffect(() => {
        if (visible) {
            body.style.overflow = "hidden";
        } else {
            body.style.overflow = "";
        }
    }, [visible]);

    return ReactDOM.createPortal(
        <div>
            <ModalOverlay onClose={onClose} />
            {children}
        </div>,
        document.getElementById("react-modals")
    );
};

Modal.propTypes = {
    children: PropTypes.node.isRequired,
    onClose: PropTypes.func.isRequired
}

export default Modal;
