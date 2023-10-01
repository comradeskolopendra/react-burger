import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button } from '@ya.praktikum/react-developer-burger-ui-components';

import EditableInput from '../../../components/editable-input/editable-input';

import styles from "./profile-editable.module.css";

const ProfileEditable = () => {
    const [isChanged, setIsChanged] = useState(false);
    const [initialValues, setInitialValues] = useState({ name: "dima", email: "comradeskolopendra@gmail.com", password: "123qwe" })
    const user = useSelector(store => store.auth.user);

    return (
        <section className={styles.editableWrapper}>
            <EditableInput placeholder={"Имя"} initialValue={initialValues.name} icon={"EditIcon"} disabled callback={setIsChanged} />
            <EditableInput placeholder={"Логин"} initialValue={initialValues.email} icon={"EditIcon"} disabled callback={setIsChanged} />
            <EditableInput placeholder={"Пароль"} initialType={"password"} initialValue={initialValues.password} icon={"EditIcon"} disabled callback={setIsChanged} />
            {isChanged ? <Button type='primary' size='medium' extraClass={styles.saveButton}>Сохранить</Button> : ""}
        </section>
    );
}

export default ProfileEditable;