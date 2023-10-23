import { useNavigate } from "react-router-dom";

import ForgotForm from "./forgot-form/forgot-form";

import { Button } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./forgot-password.module.css";
import { FC } from "react";

const ForgotPassword: FC = () => {
    const navigate = useNavigate();

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
