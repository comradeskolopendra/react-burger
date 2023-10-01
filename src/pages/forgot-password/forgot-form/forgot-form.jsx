import styles from "./forgot-form.module.css";
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";


const ForgotForm = ({ submitResetPasswordForm, email, handleChangeEmail }) => {
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
                <Button
                    htmlType="submit"
                    extraClass={"mb-20"}
                >
                    Восстановить
                </Button>
            </form>
        </>
    );
}

export default ForgotForm;