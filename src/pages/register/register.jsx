import { useNavigate } from "react-router-dom";

import {
    Button,
    Input,
} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./register.module.css";

const RegisterPage = () => {
    const navigate = useNavigate();

    return (
        <section className={styles.wrapper}>
            <form className={styles.form}>
                <h3
                    className={`text text_type_main-medium mb-6 ${styles.header}`}
                >
                    Регистрация
                </h3>
                <Input
                    type={"text"}
                    placeholder={"Имя"}
                    size={"default"}
                    extraClass={"mb-6"}
                />
                <Input
                    type={"text"}
                    placeholder={"E-mail"}
                    size={"default"}
                    extraClass={"mb-6"}
                />
                <Input
                    type={"text"}
                    placeholder={"Пароль"}
                    size={"default"}
                    extraClass={"mb-6"}
                    icon={"ShowIcon"}
                />
                <Button
                    htmlType="submit"
                    type="primary"
                    size="medium"
                    extraClass="mb-20"
                >
                    Зарегистрироваться
                </Button>
            </form>
            <section>
                <div className={`${styles.otherLinks} mb-4`}>
                    <p className="text text_type_main-default text_color_inactive">
                        Уже зарегистрированы?
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
        </section>
    );
};

export default RegisterPage;
