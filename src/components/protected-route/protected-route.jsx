import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { getStateUser } from "../../selectors/profile-selector";
import { getStateAuthChecked } from "../../selectors/auth-selectors";

const ProtectedRoute = ({ onlyUnAuth = false, component }) => {
    const user = useSelector(getStateUser);
    const isAuthChecked = useSelector(getStateAuthChecked);
    const location = useLocation();

    // проверка не завершилась. ждем выполнения запроса.
    if (!isAuthChecked) {
        return <>isn`t checked</>;
    }

    console.log(onlyUnAuth, user)
    // маршрут для неавторизованных, но есть данные о пользователе:
    if (onlyUnAuth && user) {
        
        // получили путь, из которого пришел пользователь по ключу from: (если нет - перекидываем на главную страницу)
        const { from } = location.state || { from: { pathname: "/" } };
        return <Navigate to={from.pathname} />;
    }

    // маршрут для авторизованных, но нет данных о пользователе:
    if (!onlyUnAuth && !user) {
        console.log("test")
        return <Navigate to={"/login"} state={{ from: location }} />;
    }

    // маршрут для авторизованных, и данные есть!
    // или для неавторизованных и данных нет:
    return component;
};

// 1 - для неавторизованных.
// 2 - для авторизованных.
export const UnAuthProtectedRoute = ({ component }) => (
    <ProtectedRoute onlyUnAuth={true} component={component} />
);
export const AuthProtectedRoute = ({ component }) => (
    <ProtectedRoute onlyUnAuth={false} component={component} />
);
