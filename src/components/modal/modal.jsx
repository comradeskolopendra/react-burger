import { useEffect, useRef } from "react";
import PropTypes from "prop-types"
import ReactDOM from "react-dom";

import ModalOverlay from "../modal-overlay/modal-overlay";

const Modal = ({ children, onClose, visible }) => {
    const handleEscPress = (event) => {
        if (event.key === "Escape") {
            onClose();
        }
    };

    const body = useRef(document.body);

    useEffect(() => {
        document.addEventListener("keydown", handleEscPress);
        return () => document.removeEventListener("keydown", handleEscPress)
    }, [])

    useEffect(() => {
        if (visible) {
            body.current.style.overflow = "hidden";
        } else {
            body.current.style.overflow = "";
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
    onClose: PropTypes.func.isRequired,
    visible: PropTypes.bool.isRequired
};

export default Modal;
