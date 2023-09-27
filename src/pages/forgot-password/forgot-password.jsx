import { useNavigate } from "react-router-dom";

import styles from "./forgot-password.module.css";

import {
    Button,
    Input,
} from "@ya.praktikum/react-developer-burger-ui-components";

const ForgotPassword = () => {
    const navigate = useNavigate();
    return (
        <section className={styles.wrapper}>
            <form className={styles.form}>
                <h3
                    className={`${styles.heading} text text_type_main-medium mb-6`}
                >
                    Восстановление пароля
                </h3>
                <Input
                    placeholder={"Укажите e-mail"}
                    size={"default"}
                    type={"text"}
                    extraClass={"mb-6"}
                />
                <Button htmlType="submit" extraClass={"mb-20"}>
                    Восстановить
                </Button>
            </form>
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
