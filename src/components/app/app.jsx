import { Routes, Route } from "react-router-dom";

import AppHeader from "../app-header/app-header";
import { MainPage, LoginPage, IngredientPage, RegisterPage, ForgotPassword } from '../../pages';

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
            </Routes>
        </>
    );
}

export default App;
