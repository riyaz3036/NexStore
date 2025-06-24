import { SuccessMessageResponse, SuccessResponse } from "@/types/response.types";
import { ApiConstants } from "../constants/ApiConstants";
import getAxiosInstance from "./axios.service";
import { UpdateUserRequest, User } from "@/types/user.types";

export const fetchUsers = (): Promise<SuccessResponse<User[]>> =>
    new Promise((resolve, reject) => {
        getAxiosInstance().get(ApiConstants.USER.GET_ALL(), { withCredentials: true })
            .then((response) => {
                resolve(response?.data);
            })
            .catch((err) => reject(err));
    });

export const fetchUser = (id: string): Promise<SuccessResponse<User>> =>
    new Promise((resolve, reject) => {
        getAxiosInstance().get(ApiConstants.USER.GET_BY_ID(id), { withCredentials: true })
            .then((response) => {
                resolve(response?.data);
            })
            .catch((err) => reject(err));
    });

export const updateUser = (id: string, payload: UpdateUserRequest): Promise<SuccessResponse<User>> =>
    new Promise((resolve, reject) => {
        getAxiosInstance().patch(
            ApiConstants.USER.UPDATE_BY_ID(id),
            { ...payload },
            { withCredentials: true }
        )
        .then((response) => {
            resolve(response?.data);
        })
        .catch((err) => reject(err));
    });

export const deleteUser = (id: string): Promise<SuccessMessageResponse> =>
    new Promise((resolve, reject) => {
        getAxiosInstance().delete(ApiConstants.USER.DELETE_BY_ID(id), { withCredentials: true })
            .then((response) => {
                resolve(response?.data);
            })
            .catch((err) => reject(err));
    });

const UserService = {
    fetchUsers,
    fetchUser,
    updateUser,
    deleteUser
};

export default UserService; 