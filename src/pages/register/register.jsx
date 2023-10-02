import { useNavigate, Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';

import RegisterForm from "./register-form/register-form";

import { Button } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./register.module.css";
import { getStateUser } from '../../selectors/profile-selector';

const RegisterPage = () => {
    const navigate = useNavigate();
    const user = useSelector(getStateUser);

    if (Object.keys(user).length !== 0) {
        return <Navigate to="/" replace />;
    }

    return (
        <section className={styles.wrapper}>
            <RegisterForm />
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
