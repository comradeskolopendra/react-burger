import { useState } from "react";
import styles from "./forgot-form.module.css";
import { useDispatch } from "react-redux";
import {
    Input,
    Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { resetPasswordThunk } from "../../../services/actions/auth";

const ForgotForm = () => {
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
        <>
            <form className={styles.form} onSubmit={submitResetPasswordForm}>
                <h3
                    className={`${styles.heading} text text_type_main-medium mb-6`}
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
