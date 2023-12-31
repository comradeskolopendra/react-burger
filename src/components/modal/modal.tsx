import { ReactNode, useEffect, FC } from "react";
import ReactDOM from "react-dom";

import ModalOverlay from "../modal-overlay/modal-overlay";

interface IModal {
    children: ReactNode;
    onClose: () => void;
}


const Modal: FC<IModal> = ({ children, onClose }) => {
    const handleEscPress = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
            onClose();
        }
    };

    useEffect(() => {
        document.addEventListener("keydown", handleEscPress);
        return () => document.removeEventListener("keydown", handleEscPress)
    }, [])

    return ReactDOM.createPortal(
        <div data-testid="modal">
            <ModalOverlay onClose={onClose} />
            {children}
        </div>,
        document.getElementById("react-modals")!
    );
};

export default Modal;
