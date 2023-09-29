import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import styles from "./login.module.css";
import { loginUserThunk } from "../../services/actions/auth";

import {
    Input,
    Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";

const LoginPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [userLoginForm, setUserLoginForm] = useState({
        email: "",
        password: "",
    });

    const handleChangeField = (event) => {
        const {
            target: { value, name },
        } = event;

        setUserLoginForm((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const submitLoginForm = (event) => {
        event.preventDefault();
        dispatch(
            loginUserThunk(
                {
                    email: userLoginForm.email,
                    password: userLoginForm.password,
                    callback: () => navigate("/profile", { replace: true })
                }
            )
        );
    };

    return (
        <section className={styles.wrapper}>
            <form className={styles.form} onSubmit={submitLoginForm}>
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
                    name={"email"}
                    value={userLoginForm.email}
                    onChange={handleChangeField}
                />
                <Input
                    type={"password"}
                    placeholder={"Пароль"}
                    size={"default"}
                    extraClass={"mb-6"}
                    icon={"ShowIcon"}
                    name={"password"}
                    value={userLoginForm.password}
                    onChange={handleChangeField}
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
