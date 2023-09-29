import { useDispatch, useSelector } from 'react-redux';

import { Input } from '@ya.praktikum/react-developer-burger-ui-components';

const ProfileEditable = () => {
    const dispatch = useDispatch();
    const user = useSelector(store => store.auth.user);

    

    return (
        <>
            {user.name}
            {user.email}
        </>
    );
}

export default ProfileEditable;