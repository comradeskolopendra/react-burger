import { useNavigate, Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { getStateUser } from '../../selectors/profile-selector';

import ForgotForm from "./forgot-form/forgot-form";

import { Button } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./forgot-password.module.css";

const ForgotPassword = () => {
    const navigate = useNavigate();
    const user = useSelector(getStateUser)

    if (Object.keys(user).length !== 0) {
        return <Navigate to="/" replace />;
    }

    return (
        <section className={styles.wrapper}>
            <ForgotForm />
            <div className={`${styles.otherLinks} mb-4`}>
                <p className="text text_type_main-default text_color_inactive">
                    Вспомнили пароль?
                </p>
                <Button
                    htmlType="button"
                    type="secondary"
                    size="medium"
                    extraClass={styles.buttonSecondary}
                    onClick={() => navigate("/login", { replace: true })}
                >
                    Войти
                </Button>
            </div>
        </section>
    );
};

export default ForgotPassword;
