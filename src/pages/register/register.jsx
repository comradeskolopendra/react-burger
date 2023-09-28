import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";

import { registerUserThunk } from "../../services/actions/auth";

import {
    Button,
    Input,
} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./register.module.css";


const RegisterPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [userInfo, setUserInfo] = useState({
        email: "",
        password: "",
        name: ""
    });

    const handleChangeField = (event) => {
        const { target: { name: fieldName, value: fieldValue } } = event;
        console.log(userInfo)
        setUserInfo((prevState) => ({
            ...prevState,
            [fieldName]: fieldValue
        }))
    }

    const submitRegisterForm = (event) => {
        event.preventDefault();
        dispatch(registerUserThunk({ ...userInfo }))
    }

    return (
        <section className={styles.wrapper}>
            <form className={styles.form} onSubmit={submitRegisterForm}>
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
                    name={"name"}
                    value={userInfo.name}
                    onChange={handleChangeField}
                />
                <Input
                    type={"text"}
                    placeholder={"E-mail"}
                    size={"default"}
                    extraClass={"mb-6"}
                    name={"email"}
                    value={userInfo.email}
                    onChange={handleChangeField}
                />
                <Input
                    type={"password"}
                    placeholder={"Пароль"}
                    size={"default"}
                    extraClass={"mb-6"}
                    icon={"ShowIcon"}
                    name={"password"}
                    value={userInfo.password}
                    onChange={handleChangeField}
                />
                <Button
                    htmlType={"submit"}
                    type={"primary"}
                    size={"medium"}
                    extraClass={"mb-20"}
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
