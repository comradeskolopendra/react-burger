import { Routes, Route, Navigate, useParams } from "react-router-dom";

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
} from "../../pages";

import "@ya.praktikum/react-developer-burger-ui-components";

const MockElement = () => {
    const { id } = useParams();
    console.log(id);
    return <>1231232312</>;
};
const NotFound404 = () => <>error page</>;
const QuitPage = () => <Navigate to="/login" replace />;

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
                    <Route path="" index element={<ProfileEditable />} />
                    <Route path="orders" element={<OrderHistory />} />
                    <Route path="quit" element={<QuitPage />} />
                </Route>
                <Route path="*" element={<NotFound404 />} />
            </Routes>
        </>
    );
}

export default App;
