import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Button } from "@ya.praktikum/react-developer-burger-ui-components";

import { getStateUser } from "../../../selectors/profile-selector";

import { changeUserInfoThunk } from "../../../services/actions/profile";

import EditableInput from "../../../components/editable-input/editable-input";

import styles from "./profile-editable.module.css";

const ProfileEditable = () => {
    const dispatch = useDispatch();
    const user = useSelector(getStateUser);
    const [isChanged, setIsChanged] = useState(false);
    const [values, setValues] = useState({
        name: user.name,
        email: user.email,
        password: ""
    });

    const handleOnReject = () => {
        setValues({ ...user, password: "" });
        setIsChanged(false)
    };

    const handleOnSubmit = (event) => {
        event.preventDefault();
        const {name, email, password} = values;
        if (password === "") {
            return dispatch(changeUserInfoThunk({name, email}));
        }

        dispatch(changeUserInfoThunk(values));
    };

    return (
        <form className={styles.editableWrapper} onSubmit={handleOnSubmit}>
            <EditableInput
                placeholder={"Имя"}
                initialValue={values.name}
                onChange={setValues}
                changeTracker={user.name}
                name={"name"}
                icon={"EditIcon"}
                disabled
                callback={setIsChanged}
            />
            <EditableInput
                placeholder={"Логин"}
                initialValue={values.email}
                onChange={setValues}
                changeTracker={user.email}
                name={"email"}
                icon={"EditIcon"}
                disabled
                callback={setIsChanged}
            />
            <EditableInput
                placeholder={"Пароль"}
                initialValue={values.password}
                initialType={"password"}
                onChange={setValues}
                name={"password"}
                changeTracker={""}
                icon={"EditIcon"}
                disabled
                callback={setIsChanged}
            />
            {isChanged ? (
                <section className={styles.controlButtons}>
                    <Button
                        htmlType="submit"
                        type="primary"
                        size="medium"
                        extraClass={styles.saveButton}
                    >
                        Сохранить
                    </Button>
                    <Button
                        htmlType="button"
                        type="primary"
                        size="medium"
                        extraClass={`${styles.saveButton} ${styles.reject}`}
                        onClick={handleOnReject}
                    >
                        Отменить
                    </Button>
                </section>
            ) : (
                ""
            )}
        </form>
    );
};

export default ProfileEditable;
