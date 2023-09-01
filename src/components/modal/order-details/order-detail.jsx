import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./order-details.module.css";

const OrderDetails = ({ changeVisibility }) => {
    return (
        <div className={`${styles.modalBlock} pt-30 pb-30`}>
            <div className={`${styles.closeWrapper} mt-15 mr-10`}>
                <button className={styles.closeButton} onClick={() => changeVisibility(false)}>
                    <CloseIcon />
                </button>
            </div>
        </div>
    );
};

export default OrderDetails;
