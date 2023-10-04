import { Routes, Route } from "react-router-dom";
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
    IngredientPage,
    RegisterPage,
    ForgotPassword,
    ProfileWrapper,
    ProfileEditable,
    OrderHistory,
    QuitPage,
    NotFound,
} from "../../pages";

import "@ya.praktikum/react-developer-burger-ui-components";

function App() {
    const dispatch = useDispatch();
    const isLoaded = useSelector(getStateIsLoaded);

    useEffect(() => {
        if (isLoaded) {
            dispatch(getUserInfoThunk());
        }

        dispatch(setAuthChecked(true));
    }, [isLoaded]);

    useEffect(() => {
        dispatch(getIngredientsThunk());
    }, []);

    return (
        <>
            <AppHeader />
            <Routes>
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
                <Route path="/ingredients/:id" element={<IngredientPage />} />
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
        </>
    );
}

export default App;
