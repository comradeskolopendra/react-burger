import { FC } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import ResetForm from "./reset-form/reset-form";

import styles from "./reset-password.module.css";

import { Button } from "@ya.praktikum/react-developer-burger-ui-components";

const ResetPassword: FC = () => {
    const navigate = useNavigate();

    if (!localStorage.getItem("resetPasswordAccess")) {
        return <Navigate to={"/login"} replace />;
    }

    return (
        <section className={styles.wrapper}>
            <ResetForm />
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

export default ResetPassword;
