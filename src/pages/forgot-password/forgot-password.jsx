import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";

import { resetPasswordThunk } from "../../services/actions/auth";

import ForgotForm from "./forgot-form/forgot-form";

import {
    Button,
    Input,
} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./forgot-password.module.css";

const ForgotPassword = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [email, setEmail] = useState("");

    const submitResetPasswordForm = (event) => {
        event.preventDefault();
        dispatch(resetPasswordThunk(email));
    };

    const handleChangeEmail = (event) => {
        const {
            target: { value },
        } = event;
        setEmail(value);
    };

    return (
        <section className={styles.wrapper}>
            <ForgotForm submitResetPasswordForm={submitResetPasswordForm} email={email} handleChangeEmail={handleChangeEmail} />
            <div className={`${styles.otherLinks} mb-4`}>
                <p className="text text_type_main-default text_color_inactive">
                    Вспомнили пароль?
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
    );
};

export default ForgotPassword;
