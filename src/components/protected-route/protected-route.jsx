import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { getStateUser } from "../../selectors/profile-selector";

const ProtectedRoute = ({ element }) => {
    const user = useSelector(getStateUser);

    return (Object.keys(user).length === 0) ? element : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
