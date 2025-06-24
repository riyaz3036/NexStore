import { AuthResponse, LoginRequest, RegisterRequest } from "@/types/auth.types";
import { ApiConstants } from "../constants/ApiConstants";
import getAxiosInstance from "./axios.service";
import { SuccessResponse } from "@/types/response.types";

export const login = (payload: LoginRequest): Promise<SuccessResponse<AuthResponse>> =>
    new Promise((resolve, reject) => {
        getAxiosInstance().post(
            ApiConstants.AUTH.LOGIN(),
            { ...payload },
            { withCredentials: true }
        )
        .then((response) => {
            resolve(response?.data);
        })
        .catch((err) => reject(err));
    });

export const register = (payload: RegisterRequest): Promise<SuccessResponse<AuthResponse>> =>
    new Promise((resolve, reject) => {
        getAxiosInstance().post(
            ApiConstants.AUTH.REGISTER(),
            { ...payload },
            { withCredentials: true }
        )
        .then((response) => {
            resolve(response?.data);
        })
        .catch((err) => reject(err));
    });

const AuthService = {
    login,
    register
};

export default AuthService; 