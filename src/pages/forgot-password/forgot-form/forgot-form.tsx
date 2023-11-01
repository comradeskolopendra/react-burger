import { useState, FC, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./forgot-form.module.css";
import { useAppSelector, useAppDispatch } from '../../../services/hooks/hooks';
import {
    Input,
    Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { getStateIsError } from "../../../selectors/auth-selectors";

import { resetPasswordThunk } from "../../../services/actions/auth";

const ForgotForm: FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [email, setEmail] = useState<string>("");
    const isError = useAppSelector(getStateIsError);

    const submitResetPasswordForm = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch(resetPasswordThunk(email));

        if (isError) {
            console.log("error");
            return;
        }

        localStorage.setItem("resetPasswordAccess", "true");

        navigate("/reset-password");
    };

    const handleChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
        const {
            target: { value }
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
