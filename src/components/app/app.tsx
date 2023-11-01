import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useEffect, FC } from "react";
import { useAppDispatch, useAppSelector } from '../../services/hooks/hooks';

import { getIngredientsThunk } from "../../services/actions/ingredients";
import {
    UnAuthProtectedRoute,
    AuthProtectedRoute,
} from "../protected-route/protected-route";

import { setAuthChecked } from "../../services/store/auth";
import { getStateIsLoaded } from "../../selectors/auth-selectors";
import { getUserInfoThunk } from "../../services/actions/profile";

import { setVisibleIngredient } from "../../services/store/modal";

import AppHeader from "../app-header/app-header";
import {
    MainPage,
    LoginPage,
    RegisterPage,
    ForgotPassword,
    ProfileWrapper,
    ProfileEditable,
    OrderHistory,
    QuitPage,
    NotFound,
    IngredientDetails,
    ResetPassword,
} from "../../pages";

import "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";

const App: FC = () => {
    const dispatch = useAppDispatch();
    const isLoaded = useAppSelector(getStateIsLoaded);
    const location = useLocation();
    const navigate = useNavigate();

    // проверяем, перешел ли пользователь по ссылке, а не открыл в браузере окно
    const background = location.state && location.state.background;

    useEffect(() => {
        if (isLoaded || localStorage.getItem("accessToken")) {
            dispatch(getUserInfoThunk());
        }

        dispatch(setAuthChecked(true));
    }, [isLoaded, localStorage.getItem("accessToken")]);

    const handleModalClose = () => {
        dispatch(setVisibleIngredient(false));
        // закрыаем модалку и переходим на предудыщую страницу в истории.
        navigate(-1); // На одну запись назад
    };

    useEffect(() => {
        dispatch(getIngredientsThunk());
    }, []);

    return (
        <>
            <AppHeader />
            <Routes location={background || location}>
                <Route path="/" index element={<MainPage />} />
                <Route
                    path="/login"
                    element={<UnAuthProtectedRoute component={<LoginPage />} />}
                />
                <Route
                    path="/register"
                    element={
                        <UnAuthProtectedRoute component={<RegisterPage />} />
                    }
                />
                <Route
                    path="/forgot-password"
                    element={
                        <UnAuthProtectedRoute component={<ForgotPassword />} />
                    }
                />
                <Route
                    path="/reset-password"
                    element={
                        <UnAuthProtectedRoute component={<ResetPassword />} />
                    }
                />
                <Route
                    path="/ingredients/:id"
                    element={
                        <IngredientDetails
                            type={"page"}
                            onClose={handleModalClose}
                        />
                    }
                />
                <Route
                    path="/profile"
                    element={
                        <AuthProtectedRoute component={<ProfileWrapper />} />
                    }
                >
                    <Route
                        index
                        element={
                            <AuthProtectedRoute
                                component={<ProfileEditable />}
                            />
                        }
                    />
                    <Route
                        path="orders"
                        element={
                            <AuthProtectedRoute component={<OrderHistory />} />
                        }
                    />
                    <Route
                        path="quit"
                        element={
                            <AuthProtectedRoute component={<QuitPage />} />
                        }
                    />
                </Route>
                <Route path="*" element={<NotFound />} />
            </Routes>

            {background && (
                <Routes>
                    <Route
                        path="/ingredients/:id"
                        element={
                            <Modal onClose={handleModalClose}>
                                <IngredientDetails
                                    onClose={handleModalClose}
                                    type={"modal"}
                                />
                            </Modal>
                        }
                    />
                </Routes>
            )}
        </>
    );
}

export default App;
