import { SuccessMessageResponse, SuccessPaginatedResponse, SuccessResponse } from "@/types/response.types";
import { ApiConstants } from "../constants/ApiConstants";
import getAxiosInstance from "./axios.service";
import { CreateFavoriteRequest, Favorite } from "@/types/favorite.types";

export const fetchFavorites = (): Promise<SuccessPaginatedResponse<Favorite[]>> =>
    new Promise((resolve, reject) => {
        getAxiosInstance().get(ApiConstants.FAVORITE.GET_ALL(), { withCredentials: true })
            .then((response) => {
                resolve(response?.data);
            })
            .catch((err) => reject(err));
    });

export const fetchFavorite = (id: string): Promise<SuccessResponse<Favorite>> =>
    new Promise((resolve, reject) => {
        getAxiosInstance().get(ApiConstants.FAVORITE.GET_BY_ID(id), { withCredentials: true })
            .then((response) => {
                resolve(response?.data);
            })
            .catch((err) => reject(err));
    });

export const fetchFavoritesByUser = (userId: string, page: number): Promise<SuccessPaginatedResponse<Favorite[]>> =>
    new Promise((resolve, reject) => {
        getAxiosInstance().get(ApiConstants.FAVORITE.GET_BY_USER_ID(userId, page), { withCredentials: true })
            .then((response) => {
                resolve(response?.data);
            })
            .catch((err) => reject(err));
    });


export const fetchFavoritesByUserAndVariant = (userId: string, variantId: string): Promise<SuccessResponse<Favorite>> =>
    new Promise((resolve, reject) => {
        getAxiosInstance().get(ApiConstants.FAVORITE.GET_BY_USER_ID_VARIANT_ID(userId, variantId), { withCredentials: true })
            .then((response) => {
                resolve(response?.data);
            })
            .catch((err) => reject(err));
    });

export const createFavorite = (payload: CreateFavoriteRequest): Promise<SuccessResponse<Favorite>> =>
    new Promise((resolve, reject) => {
        getAxiosInstance().post(
            ApiConstants.FAVORITE.CREATE(),
            { ...payload },
            { withCredentials: true }
        )
        .then((response) => {
            resolve(response?.data);
        })
        .catch((err) => reject(err));
    });

export const deleteFavorite = (id: string): Promise<SuccessMessageResponse> =>
    new Promise((resolve, reject) => {
        getAxiosInstance().delete(ApiConstants.FAVORITE.DELETE_BY_ID(id), { withCredentials: true })
            .then((response) => {
                resolve(response?.data);
            })
            .catch((err) => reject(err));
    });

const FavoriteService = {
    fetchFavorites,
    fetchFavorite,
    fetchFavoritesByUser,
    fetchFavoritesByUserAndVariant,
    createFavorite,
    deleteFavorite
};

export default FavoriteService; 