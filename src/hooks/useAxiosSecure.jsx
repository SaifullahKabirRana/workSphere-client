import axios from "axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";

const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
})
const useAxiosSecure = () => {
    const { logOut } = useAuth();
    const navigate = useNavigate();

    // Response Interceptor
    axiosSecure.interceptors.response.use(
        res => {
            // console.log('response from:', res);
            return res;
        },
        error => {
            console.log('error from axios interceptors', error.response);
            if (error.response.status === 401 || error.response.status === 403) {
                navigate('/login');
                logOut();
               
            }
            return Promise.reject(error);
        }
    )


    return axiosSecure
};

export default useAxiosSecure;