import { ChangeEvent, FC, FormEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from '../../../services/hooks/hooks';

import { loginUserThunk } from "../../../services/actions/auth";

import {
    Input,
    Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./login-form.module.css";
import { getStateIsError } from "../../../selectors/auth-selectors";

const LoginForm: FC = () => {
    const dispatch = useAppDispatch();
    const isErrorAuth = useAppSelector(getStateIsError);
    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

    const [userInfo, setUserInfo] = useState({
        email: "",
        password: "",
    });

    const handlePasswordToggle = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    const handleChangeField = (event: ChangeEvent<HTMLInputElement>) => {
        const {
            target: { value, name },
        } = event;

        setUserInfo((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const submitLoginForm = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch(
            loginUserThunk({
                email: userInfo.email,
                password: userInfo.password,
            })
        );
    };

    return (
        <form className={`${styles.form} mb-20`} onSubmit={submitLoginForm}>
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
            {isErrorAuth ? (
                <p className="text text_type_main-small mb-6">
                    Вы ввели неправильный логин или пароль!
                </p>
            ) : (
                ""
            )}
            <Button htmlType="submit" type="primary" size="medium">
                Войти
            </Button>
        </form>
    );
};

export default LoginForm;
