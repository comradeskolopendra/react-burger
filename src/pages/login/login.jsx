import { Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import LoginForm from "./login-form/login-form";

import styles from "./login.module.css";

import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { getStateUser } from "../../selectors/profile-selector";

const LoginPage = () => {
    const navigate = useNavigate();
    const user = useSelector(getStateUser);

    if (Object.keys(user).length !== 0) {
        return <Navigate to="/" replace />;
    }

    return (
        <section className={styles.wrapper}>
            <LoginForm />
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
                        onClick={() => navigate("/register", { replace: true })}
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
                        onClick={() =>
                            navigate("/forgot-password", { replace: true })
                        }
                    >
                        Восстановить пароль
                    </Button>
                </div>
            </section>
        </section>
    );
};

export default LoginPage;
