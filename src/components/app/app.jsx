import { Routes, Route } from "react-router-dom";

import ProtectedRoute from '../protected-route/protected-route';

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
    NotFound
} from "../../pages";

import "@ya.praktikum/react-developer-burger-ui-components";

function App() {
    return (
        <>
            <AppHeader />
            <Routes>
                <Route path="/" index element={<MainPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/ingredients/:id" element={<IngredientPage />} />
                <Route path="/profile" element={<ProfileWrapper />}>
                    <Route index element={<ProfileEditable />} />
                    <Route path="orders" element={<OrderHistory />} />
                    <Route path="quit" element={<QuitPage />} />
                </Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    );
}

export default App;
