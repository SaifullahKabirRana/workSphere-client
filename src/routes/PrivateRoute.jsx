import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if (loading) {
        return <div className="flex justify-center mt-60 md:mt-72 xl:mt-96">
            <span className="loader"></span>
        </div>
    }

    if (user) {
        return children
    }


    return <Navigate state={location?.pathname} to='/login' replace={true}></Navigate>
};

export default PrivateRoute;