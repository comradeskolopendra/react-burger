import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useEffect, FC } from "react";
import { useAppDispatch, useAppSelector } from "../../services/hooks/hooks";

import { getIngredientsThunk } from "../../services/actions/ingredients";
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
    ProfileOrders,
    QuitPage,
    NotFound,
    IngredientDetails,
    ResetPassword,
    Feed,
    SelectedOrderInfo,
} from "../../pages";

import "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import { connect as profileOrdersConnection } from "../../services/actions/profile-orders";
import { connect as feedConnection } from "../../services/actions/feed"
import { getStateWSFeedMessage } from "../../selectors/feed-selectors";
import { getStateWSProfileOrdersMessage } from "../../selectors/profile-orders-selectors";
import { getStateUser } from "../../selectors/profile-selector";

const App: FC = () => {
    const dispatch = useAppDispatch();
    const isLoaded = useAppSelector(getStateIsLoaded);
    const location = useLocation();
    const navigate = useNavigate();

    const wsFeedMessage = useAppSelector(getStateWSFeedMessage);
    const wsProfileOrdersMessage = useAppSelector(getStateWSProfileOrdersMessage);
    const user = useAppSelector(getStateUser);

    // проверяем, перешел ли пользователь по ссылке, а не открыл в браузере окно
    const background = location.state && location.state.background;

    useEffect(() => {
        if (isLoaded || localStorage.getItem("accessToken")) {
            dispatch(getUserInfoThunk());
        }

        dispatch(setAuthChecked(true));
    }, [isLoaded, localStorage.getItem("accessToken")]);

    const handleModalClose = () => {
        navigate(-1);
    };

    useEffect(() => {
        const token = localStorage.getItem("accessToken")?.split(" ")[1];
        if (token && user) {
            dispatch(profileOrdersConnection(`wss://norma.nomoreparties.space/orders?token=${token}`))
        }
    }, [user])

    useEffect(() => {
        dispatch(getIngredientsThunk());
        dispatch(feedConnection("wss://norma.nomoreparties.space/orders/all"));
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
                <Route path="/feed" element={<Feed />} />
                <Route path="/feed/:orderId" element={<SelectedOrderInfo messageFromWS={wsFeedMessage} type={"page"} onClose={undefined} />} />
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
                    path="/profile/orders/:orderId"
                    element={<AuthProtectedRoute component={<SelectedOrderInfo messageFromWS={wsProfileOrdersMessage} type={"page"} onClose={undefined} />} />}
                />

                <Route
                    path="/profile"
                    element={
                        <AuthProtectedRoute component={<ProfileWrapper />} />
                    }
                >
                    <Route
                        index
                        element={<AuthProtectedRoute component={<ProfileEditable />} />}
                    />
                    <Route
                        path="orders"
                        element={<AuthProtectedRoute component={<ProfileOrders />} />}
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
                    <Route
                        path="/feed/:orderId"
                        element={
                            <Modal onClose={handleModalClose}>
                                <SelectedOrderInfo
                                    onClose={handleModalClose}
                                    messageFromWS={wsFeedMessage}
                                    type={"modal"}
                                />
                            </Modal>
                        }
                    />

                    <Route
                        path="/profile/orders/:orderId"
                        element={<AuthProtectedRoute
                            component={<Modal onClose={handleModalClose}>
                                <SelectedOrderInfo
                                    onClose={handleModalClose}
                                    messageFromWS={wsProfileOrdersMessage}
                                    type={"modal"}
                                />
                            </Modal>
                            } />
                        }
                    />
                </Routes>
            )}
        </>
    );
};

export default App;
