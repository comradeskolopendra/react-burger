import { FC, ReactElement } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { getStateUser } from "../../selectors/profile-selector";
import { getStateAuthChecked } from "../../selectors/auth-selectors";
import { IUser } from "../../utils/types";

interface IProtectedRoute {
    onlyUnAuth: Boolean;
    component: ReactElement;
}

interface ITypeRoutes {
    component: ReactElement;
}

const ProtectedRoute: FC<IProtectedRoute> = ({ onlyUnAuth = false, component }) => {
    const user: IUser = useSelector(getStateUser);
    const isAuthChecked: boolean = useSelector(getStateAuthChecked);
    const location = useLocation();

    // проверка не завершилась. ждем выполнения запроса.
    if (!isAuthChecked) {
        return <>isn`t checked</>;
    }

    // маршрут для неавторизованных, но есть данные о пользователе:
    if (onlyUnAuth && user) {

        // получили путь, из которого пришел пользователь по ключу from: (если нет - перекидываем на главную страницу)
        const { from } = location.state || { from: { pathname: "/" } };
        return <Navigate to={from.pathname} />;
    }

    // маршрут для авторизованных, но нет данных о пользователе:
    if (!onlyUnAuth && !user) {
        return <Navigate to={"/login"} state={{ from: location }} />;
    }

    // маршрут для авторизованных, и данные есть!
    // или для неавторизованных и данных нет:
    return component;
};

// 1 - для неавторизованных.
// 2 - для авторизованных.
export const UnAuthProtectedRoute: FC<ITypeRoutes> = ({ component }) => (
    <ProtectedRoute onlyUnAuth={true} component={component} />
);

export const AuthProtectedRoute: FC<ITypeRoutes> = ({ component }) => (
    <ProtectedRoute onlyUnAuth={false} component={component} />
);
