import { Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUserThunk } from "../../../services/actions/auth";
import { useEffect } from "react";

const QuitPage = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(logoutUserThunk());
    }, [])

    return <Navigate to={"/"} replace />
}

export default QuitPage;