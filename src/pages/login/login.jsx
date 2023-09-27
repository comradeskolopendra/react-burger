import { useNavigate } from 'react-router-dom';
import styles from "./login.module.css";

import {
    Input,
    Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

const LoginPage = () => {
    const navigate = useNavigate();

    return (
        <section className={styles.wrapper}>
            <form className={styles.form}>
                <h3
                    className={`text text_type_main-medium mb-6 ${styles.header}`}
                >
                    Вход
                </h3>
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
                    Войти
                </Button>
            </form>
            <section>
                <div className={`${styles.otherLinks} mb-4`}>
                    <p className="text text_type_main-default text_color_inactive">
                        Вы - новый пользователь?
                    </p>
                    <Button
                        htmlType="button"
                        type="secondary"
                        size="medium"
                        extraClass={styles.buttonSecondary}
                        onClick={() => navigate("/register", {replace: true})}
                    >
                        Зарегистрироваться
                    </Button>
                </div>
                <div className={styles.otherLinks}>
                    <p className="text text_type_main-default text_color_inactive">
                        Забыли пароль?
                    </p>
                    <Button
                        htmlType="button"
                        type="secondary"
                        size="medium"
                        extraClass={styles.buttonSecondary}
                        onClick={() => navigate("/forgot-password", {replace: true})}
                    >
                        Восстановить пароль
                    </Button>
                </div>
            </section>
        </section>
    );
};

export default LoginPage;
