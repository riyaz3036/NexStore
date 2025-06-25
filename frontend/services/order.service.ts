import { SuccessMessageResponse, SuccessPaginatedResponse, SuccessResponse } from "@/types/response.types";
import { ApiConstants } from "../constants/ApiConstants";
import getAxiosInstance from "./axios.service";
import { CreateOrderRequest, Order } from "@/types/order.types";

export const fetchOrders = (): Promise<SuccessResponse<Order[]>> =>
    new Promise((resolve, reject) => {
        getAxiosInstance().get(ApiConstants.ORDER.GET_ALL(), { withCredentials: true })
            .then((response) => {
                resolve(response?.data);
            })
            .catch((err) => reject(err));
    });

export const fetchOrdersForUser = (userId: string, page: number): Promise<SuccessPaginatedResponse<Order[]>> =>
    new Promise((resolve, reject) => {
        getAxiosInstance().get(ApiConstants.ORDER.GET_ALL_BY_USER(userId, page), { withCredentials: true })
            .then((response) => {
                resolve(response?.data);
            })
            .catch((err) => reject(err));
    });

export const fetchOrder = (id: string): Promise<SuccessResponse<Order>> =>
    new Promise((resolve, reject) => {
        getAxiosInstance().get(ApiConstants.ORDER.GET_BY_ID(id), { withCredentials: true })
            .then((response) => {
                resolve(response?.data);
            })
            .catch((err) => reject(err));
    });

export const createOrder = (payload: CreateOrderRequest): Promise<SuccessResponse<Order>> =>
    new Promise((resolve, reject) => {
        getAxiosInstance().post(
            ApiConstants.ORDER.CREATE(),
            payload,
            { withCredentials: true }
        )
        .then((response) => {
            resolve(response?.data);
        })
        .catch((err) => reject(err));
    });

export const deleteOrder = (id: string): Promise<SuccessMessageResponse> =>
    new Promise((resolve, reject) => {
        getAxiosInstance().delete(ApiConstants.ORDER.DELETE_BY_ID(id), { withCredentials: true })
            .then((response) => {
                resolve(response?.data);
            })
            .catch((err) => reject(err));
    });

const OrderService = {
    fetchOrders,
    fetchOrdersForUser,
    fetchOrder,
    createOrder,
    deleteOrder
};

export default OrderService; 