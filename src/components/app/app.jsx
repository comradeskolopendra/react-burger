import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getIngredientsThunk } from '../../services/actions/ingredients';
import {
    UnAuthProtectedRoute,
    AuthProtectedRoute,
} from "../protected-route/protected-route";

import { setAuthChecked } from "../../services/store/auth";
import { getStateIsLoaded } from "../../selectors/auth-selectors";
import { getUserInfoThunk } from "../../services/actions/profile";

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
} from "../../pages";

import "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import IngredientDetails from "../../pages/main/ingredient-details/ingredient-details";
import { getStateIngredients } from "../../selectors/ingredients-selectors";
import { getStateVisibleIngredient } from "../../selectors/modal-selectors";

function App() {
    const dispatch = useDispatch();
    const isLoaded = useSelector(getStateIsLoaded);
    const location = useLocation();
    const navigate = useNavigate();
    const ingredients = useSelector(getStateIngredients);
    const visibleIngredient = useSelector(getStateVisibleIngredient)

    // проверяем, перешел ли пользователь по ссылке, а не открыл в браузере окно
    const background = location.state && location.state.background;

    useEffect(() => {
        if (isLoaded) {
            dispatch(getUserInfoThunk());
        }

        dispatch(setAuthChecked(true));
    }, [isLoaded]);

    const handleModalClose = () => {
        // закрыаем модалку переходя на предудыщую страницу в истории.
        navigate(-1); // На одну запись назад
    };

    useEffect(() => {
        dispatch(getIngredientsThunk());
        console.log(ingredients)
    }, [visibleIngredient]);

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
                <Route path="/ingredients/:id" element={<IngredientDetails />} />
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
                                <IngredientDetails />
                            </Modal>
                        }
                    />
                </Routes>
            )}
        </>
    );
}

export default App;
