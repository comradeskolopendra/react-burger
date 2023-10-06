import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    getStateIsError,
    getStateIsPasswordSuccessfullyChanged,
} from "../../../selectors/auth-selectors";

import styles from "./reset-form.module.css";

import {
    Button,
    Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { changePasswordThunk } from "../../../services/actions/auth";

const ResetForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [formValues, setFormValues] = useState({
        password: "",
        token: "",
    });
    const isError = useSelector(getStateIsError);
    const isPasswordSuccessfullyChanged = useSelector(
        getStateIsPasswordSuccessfullyChanged
    );

    const handlePasswordToggle = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    const handleChangeField = (event) => {
        const {
            target: { value, name },
        } = event;
        setFormValues((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleChangePassword = (event) => {
        event.preventDefault();
        if (!formValues.password || !formValues.token) {
            return;
        }

        dispatch(changePasswordThunk(formValues));
    };

    useSelector(() => {
        if (isPasswordSuccessfullyChanged) {
            navigate("/login");
            localStorage.removeItem("resetPasswordAccess");
        }
    }, [isPasswordSuccessfullyChanged]);

    return (
        <form className={styles.form} onSubmit={handleChangePassword}>
            <h3 className={`${styles.header} text text_type_main-medium mb-6`}>
                Восстановление пароля
            </h3>
            <Input
                placeholder={"Введите новый пароль"}
                size={"default"}
                type={isPasswordVisible ? "text" : "password"}
                extraClass={"mb-6"}
                name={"password"}
                value={formValues.password}
                onIconClick={handlePasswordToggle}
                onChange={handleChangeField}
                icon={"ShowIcon"}
            />
            <Input
                placeholder={"Введите код из письма"}
                size={"default"}
                type={"text"}
                extraClass={"mb-6"}
                name={"token"}
                value={formValues.token}
                onChange={handleChangeField}
            />
            <Button htmlType="submit" extraClass={"mb-20"}>
                Восстановить
            </Button>

            {isError && (
                <p
                    className={`${styles.header} text text_type_main-small mb-6`}
                >
                    Произошла ошибка!
                </p>
            )}
        </form>
    );
};

export default ResetForm;
