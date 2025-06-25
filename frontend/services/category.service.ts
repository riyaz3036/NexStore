import { SuccessMessageResponse, SuccessResponse } from "@/types/response.types";
import { ApiConstants } from "../constants/ApiConstants";
import getAxiosInstance from "./axios.service";
import { Category, CreateCategoryRequest, UpdateCategoryRequest } from "@/types/category.types";

export const fetchCategories = (): Promise<SuccessResponse<Category[]>> =>
    new Promise((resolve, reject) => {
        getAxiosInstance().get(ApiConstants.CATEGORY.GET_ALL(), { withCredentials: true })
            .then((response) => {
                resolve(response?.data);
            })
            .catch((err) => reject(err));
    });

export const fetchCategory = (id: string): Promise<SuccessResponse<Category>> =>
    new Promise((resolve, reject) => {
        getAxiosInstance().get(ApiConstants.CATEGORY.GET_BY_ID(id), { withCredentials: true })
            .then((response) => {
                resolve(response?.data);
            })
            .catch((err) => reject(err));
    });

export const createCategory = (payload: CreateCategoryRequest): Promise<SuccessResponse<Category>> =>
    new Promise((resolve, reject) => {
        getAxiosInstance().post(
            ApiConstants.CATEGORY.CREATE(),
            { ...payload },
            { withCredentials: true }
        )
        .then((response) => {
            resolve(response?.data);
        })
        .catch((err) => reject(err));
    });

export const updateCategory = (id: string, payload: UpdateCategoryRequest): Promise<SuccessResponse<Category>> =>
    new Promise((resolve, reject) => {
        getAxiosInstance().patch(
            ApiConstants.CATEGORY.UPDATE_BY_ID(id),
            { ...payload },
            { withCredentials: true }
        )
        .then((response) => {
            resolve(response?.data);
        })
        .catch((err) => reject(err));
    });

export const deleteCategory = (id: string): Promise<SuccessMessageResponse> =>
    new Promise((resolve, reject) => {
        getAxiosInstance().delete(ApiConstants.CATEGORY.DELETE_BY_ID(id), { withCredentials: true })
            .then((response) => {
                resolve(response?.data);
            })
            .catch((err) => reject(err));
    });

const CategoryService = {
    fetchCategories,
    fetchCategory,
    createCategory,
    updateCategory,
    deleteCategory
};

export default CategoryService; 