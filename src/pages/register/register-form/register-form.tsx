import { useState, FC, ChangeEvent, FormEvent } from "react";
import { useDispatch } from "react-redux";

import { registerUserThunk } from "../../../services/actions/auth";

import {
    Input,
    Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./register-form.module.css";

const RegisterForm: FC = () => {
    const dispatch = useDispatch();
    const [userInfo, setUserInfo] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const handlePasswordToggle = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    const handleChangeField = (event: ChangeEvent<HTMLInputElement>) => {
        const {
            target: { name: fieldName, value: fieldValue },
        } = event;
        setUserInfo((prevState) => ({
            ...prevState,
            [fieldName]: fieldValue,
        }));
    };

    const handleRegisterFormSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // @ts-ignore
        dispatch(registerUserThunk(userInfo));
    };

    return (
        <form className={styles.form} onSubmit={handleRegisterFormSubmit}>
            <h3 className={`text text_type_main-medium mb-6 ${styles.header}`}>
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
                htmlType={"submit"}
                type={"primary"}
                size={"medium"}
                extraClass={"mb-20"}
            >
                Зарегистрироваться
            </Button>
        </form>
    );
};

export default RegisterForm;
