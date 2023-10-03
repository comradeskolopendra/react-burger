import { useState } from "react";
import { useDispatch } from 'react-redux';

import { loginUserThunk } from '../../../services/actions/auth';

import {
    Input,
    Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./login-form.module.css";

const LoginForm = () => {
    const dispatch = useDispatch();
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const handlePasswordToggle = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    const [userInfo, setUserInfo] = useState({
        email: "",
        password: "",
    });

    const handleChangeField = (event) => {
        const {
            target: { value, name },
        } = event;

        setUserInfo((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const submitLoginForm = (event) => {
        event.preventDefault();
        dispatch(
            loginUserThunk({
                email: userInfo.email,
                password: userInfo.password,
            })
        );
    };

    return (
        <form className={styles.form} onSubmit={submitLoginForm}>
            <h3 className={`text text_type_main-medium mb-6 ${styles.header}`}>
                Вход
            </h3>
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
                type={isPasswordVisible ? "text" : "password"}
                placeholder={"Пароль"}
                size={"default"}
                extraClass={"mb-6"}
                icon={"ShowIcon"}
                name={"password"}
                onIconClick={handlePasswordToggle}
                value={userInfo.password}
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
    );
};

export default LoginForm;
