import { getAccessTokenFromCookie } from "@/utils/cookie.utils";
import axios, { AxiosInstance } from "axios";

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_LOCAL_BE_URL
});

// Request interceptor to add the auhorization to the request
axiosInstance.interceptors.request.use(
    async (config) => {
        const token = getAccessTokenFromCookie();
       
        if (token && !config.headers['Authorization']) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        // config.headers['x-api-key'] = process.env.NEXT_PUBLIC_API_KEY;
        config.headers['Cache-Control'] = 'no-cache';
        config.headers['x-api-key'] = process.env.NEXT_PUBLIC_API_KEY;
        config.headers['Pragma'] = 'no-cache';
        config.headers['Expires'] = '0';
        return config;
    },
    (error) => Promise.reject(error)
);

const getAxiosInstance = (): AxiosInstance => {
    return axiosInstance;
}

export default getAxiosInstance;