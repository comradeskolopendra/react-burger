import { ReactNode, useEffect, useRef, FC } from "react";
import ReactDOM from "react-dom";

import ModalOverlay from "../modal-overlay/modal-overlay";

interface IModal {
    children: ReactNode;
    onClose: (...args: any) => any;
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
        <div>
            <ModalOverlay onClose={onClose} />
            {children}
        </div>,
        document.getElementById("react-modals")!
    );
};

export default Modal;
