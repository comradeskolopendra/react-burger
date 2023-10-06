import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./forgot-form.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
    Input,
    Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { getStateIsError } from "../../../selectors/auth-selectors";

import { resetPasswordThunk } from "../../../services/actions/auth";

const ForgotForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [email, setEmail] = useState("");
    const isError = useSelector(getStateIsError);

    const submitResetPasswordForm = (event) => {
        event.preventDefault();
        dispatch(resetPasswordThunk(email));

        if (isError) {
            console.log("error");
            return;
        }

        localStorage.setItem("resetPasswordAccess", true);

        navigate("/reset-password");
    };

    const handleChangeEmail = (event) => {
        const {
            target: { value },
        } = event;

        setEmail(value);
    };
    return (
        <>
            <form className={styles.form} onSubmit={submitResetPasswordForm}>
                <h3
                    className={`${styles.header} text text_type_main-medium mb-6`}
                >
                    Восстановление пароля
                </h3>
                <Input
                    placeholder={"Укажите e-mail"}
                    size={"default"}
                    type={"text"}
                    extraClass={"mb-6"}
                    value={email}
                    onChange={handleChangeEmail}
                />
                <Button htmlType="submit" extraClass={"mb-20"}>
                    Восстановить
                </Button>
            </form>
        </>
    );
};

export default ForgotForm;
