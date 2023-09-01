import { useEffect } from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";

import ModalOverlay from "../modal-overlay/modal-overlay";

const Modal = ({ children, handleBackgroundClick }) => {
    const handleEscPress = (event) => {
        if (event.key === "Escape") {
            handleBackgroundClick();
        }
    };

    useEffect(() => {
        document.addEventListener("keydown", handleEscPress);
        return () => document.removeEventListener("keydown", handleEscPress)
    }, [])

    return ReactDOM.createPortal(
        <div>
            <ModalOverlay handleBackgroundClick={handleBackgroundClick} />
            {children}
        </div>,
        document.getElementById("react-modals")
    );
};

Modal.propTypes = {
    children: PropTypes.node,
    handleBackgroundClick: PropTypes.func
}

export default Modal;
