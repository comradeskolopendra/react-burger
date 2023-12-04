import { Navigate } from "react-router-dom";
import { useAppDispatch } from '../../../services/hooks/hooks';
import { logoutUserThunk } from "../../../services/actions/auth";
import { useEffect, FC } from "react";

const QuitPage: FC = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(logoutUserThunk());
    }, [])

    return <Navigate to={"/"} replace />
}

export default QuitPage;