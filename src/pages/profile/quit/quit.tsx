import { Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUserThunk } from "../../../services/actions/auth";
import { useEffect, FC } from "react";

const QuitPage: FC = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        // @ts-ignore
        dispatch(logoutUserThunk());
    }, [])

    return <Navigate to={"/"} replace />
}

export default QuitPage;