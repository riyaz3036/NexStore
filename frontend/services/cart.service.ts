import { SuccessArrayResponse, SuccessMessageResponse, SuccessPaginatedResponse, SuccessResponse } from "@/types/response.types";
import { ApiConstants } from "../constants/ApiConstants";
import getAxiosInstance from "./axios.service";
import { Cart, CreateCartRequest, UpdateCartRequest } from "@/types/cart.types";

export const fetchCarts = (): Promise<SuccessResponse<Cart[]>> =>
    new Promise((resolve, reject) => {
        getAxiosInstance().get(ApiConstants.CART.GET_ALL(), { withCredentials: true })
            .then((response) => {
                resolve(response?.data);
            })
            .catch((err) => reject(err));
    });

export const fetchCartsByUser = (userId: string, page: number): Promise<SuccessPaginatedResponse<Cart[]>> =>
    new Promise((resolve, reject) => {
        getAxiosInstance().get(ApiConstants.CART.GET_ALL_BY_USER(userId, page), { withCredentials: true })
            .then((response) => {
                resolve(response?.data);
            })
            .catch((err) => reject(err));
    });

export const fetchCartsByUserWithoutPagination = (userId: string): Promise<SuccessArrayResponse<Cart[]>> =>
    new Promise((resolve, reject) => {
        getAxiosInstance().get(ApiConstants.CART.GET_ALL_BY_USER_WITHOUT_PAGINATION(userId), { withCredentials: true })
            .then((response) => {
                resolve(response?.data);
            })
            .catch((err) => reject(err));
    });

export const fetchCart = (id: string): Promise<SuccessResponse<Cart>> =>
    new Promise((resolve, reject) => {
        getAxiosInstance().get(ApiConstants.CART.GET_BY_ID(id), { withCredentials: true })
            .then((response) => {
                resolve(response?.data);
            })
            .catch((err) => reject(err));
    });

export const createMultipleCarts = (payload: CreateCartRequest[]): Promise<SuccessResponse<Cart[]>> =>
    new Promise((resolve, reject) => {
        getAxiosInstance().post(
            ApiConstants.CART.CREATE_MULTIPLE(),
            payload,
            { withCredentials: true }
        )
        .then((response) => {
            resolve(response?.data);
        })
        .catch((err) => reject(err));
    });

export const updateCarts = (payload: UpdateCartRequest[]): Promise<SuccessResponse<Cart>> =>
    new Promise((resolve, reject) => {
        getAxiosInstance().patch(
            ApiConstants.CART.UPDATE_CARTS(),
            payload,
            { withCredentials: true }
        )
        .then((response) => {
            resolve(response?.data);
        })
        .catch((err) => reject(err));
    });

export const deleteCart = (id: string): Promise<SuccessMessageResponse> =>
    new Promise((resolve, reject) => {
        getAxiosInstance().delete(ApiConstants.CART.DELETE_BY_ID(id), { withCredentials: true })
            .then((response) => {
                resolve(response?.data);
            })
            .catch((err) => reject(err));
    });

export const emptyCartForUser = (userId: string): Promise<SuccessMessageResponse> =>
    new Promise((resolve, reject) => {
        getAxiosInstance().delete(ApiConstants.CART.EMPTY_CART_FOR_USER(userId), { withCredentials: true })
            .then((response) => {
                resolve(response?.data);
            })
            .catch((err) => reject(err));
    });

const CartService = {
    fetchCarts,
    fetchCartsByUser,
    fetchCartsByUserWithoutPagination,
    fetchCart,
    createMultipleCarts,
    updateCarts,
    deleteCart,
    emptyCartForUser
};

export default CartService; 