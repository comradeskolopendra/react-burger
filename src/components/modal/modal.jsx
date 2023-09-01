import ReactDOM from "react-dom";

import ModalOverlay from "../modal-overlay/modal-overlay";
// import "@ya.praktikum/react-developer-burger-ui-components";

const Modal = ({ children, handleBackgroundClick }) => {
    return ReactDOM.createPortal(
        <div>
            <ModalOverlay handleBackgroundClick={handleBackgroundClick} />
            {children}
        </div>,
        document.getElementById("react-modals")
    );
};

export default Modal;
