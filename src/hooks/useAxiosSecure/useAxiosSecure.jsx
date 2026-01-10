import axios from 'axios';
import { useEffect } from 'react';
import useAuth from '../useAuth/useAuth';
import { useNavigate } from 'react-router';

const axiosSecure = axios.create({
    baseURL: 'https://zap-shift-server-black.vercel.app',
});

const useAxiosSecure = () => {
    const { user, logOut } = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        //intercept request
        const reqInterceptor = axiosSecure.interceptors.request.use((config) => {
            config.headers.Authorization = `Bearer ${user?.accessToken}`;
            return config;
        });


        //intercept response
        const resInterceptor = axiosSecure.interceptors.response.use((response) => {
            return response;
        }, (error) => {
            if (error.response && error.response.status === 401) {
                logOut()
                    .then(() => {
                        navigate('/auth/login');
                    })
            }
            return Promise.reject(error);
        });

        return () => {
            axiosSecure.interceptors.request.eject(reqInterceptor);
            axiosSecure.interceptors.response.eject(resInterceptor);
        }
    }, [user, logOut, navigate]);

    return axiosSecure;
};

export default useAxiosSecure;
