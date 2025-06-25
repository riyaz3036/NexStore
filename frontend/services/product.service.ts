import { SuccessMessageResponse, SuccessResponse } from "@/types/response.types";
import { ApiConstants } from "../constants/ApiConstants";
import getAxiosInstance from "./axios.service";
import { CreateProductRequest, Product, UpdateProductRequest } from "@/types/product.types";

export const fetchProducts = (): Promise<SuccessResponse<Product[]>> =>
    new Promise((resolve, reject) => {
        getAxiosInstance().get(ApiConstants.PRODUCT.GET_ALL(), { withCredentials: true })
            .then((response) => {
                resolve(response?.data);
            })
            .catch((err) => reject(err));
    });

export const fetchProductsWithoutPagination = (): Promise<SuccessResponse<Product[]>> =>
    new Promise((resolve, reject) => {
        getAxiosInstance().get(ApiConstants.PRODUCT.GET_ALL_WITHOUT_PAGINATION(), { withCredentials: true })
            .then((response) => {
                resolve(response?.data);
            })
            .catch((err) => reject(err));
    });

export const fetchProduct = (id: string): Promise<SuccessResponse<Product>> =>
    new Promise((resolve, reject) => {
        getAxiosInstance().get(ApiConstants.PRODUCT.GET_BY_ID(id), { withCredentials: true })
            .then((response) => {
                resolve(response?.data);
            })
            .catch((err) => reject(err));
    });

export const createProduct = (payload: CreateProductRequest): Promise<SuccessResponse<Product>> =>
    new Promise((resolve, reject) => {
        getAxiosInstance().post(
            ApiConstants.PRODUCT.CREATE(),
            { ...payload },
            { withCredentials: true }
        )
        .then((response) => {
            resolve(response?.data);
        })
        .catch((err) => reject(err));
    });

export const createMultipleProducts = (payload: CreateProductRequest[]): Promise<SuccessResponse<Product[]>> =>
    new Promise((resolve, reject) => {
        getAxiosInstance().post(
            ApiConstants.PRODUCT.CREATE_MULTIPLE(),
            { ...payload },
            { withCredentials: true }
        )
        .then((response) => {
            resolve(response?.data);
        })
        .catch((err) => reject(err));
    });

export const updateProduct = (id: string, payload: UpdateProductRequest): Promise<SuccessResponse<Product>> =>
    new Promise((resolve, reject) => {
        getAxiosInstance().patch(
            ApiConstants.PRODUCT.UPDATE_BY_ID(id),
            { ...payload },
            { withCredentials: true }
        )
        .then((response) => {
            resolve(response?.data);
        })
        .catch((err) => reject(err));
    });

export const deleteProduct = (id: string): Promise<SuccessMessageResponse> =>
    new Promise((resolve, reject) => {
        getAxiosInstance().delete(ApiConstants.PRODUCT.DELETE_BY_ID(id), { withCredentials: true })
            .then((response) => {
                resolve(response?.data);
            })
            .catch((err) => reject(err));
    });

const ProductService = {
    fetchProducts,
    fetchProductsWithoutPagination,
    fetchProduct,
    createProduct,
    createMultipleProducts,
    updateProduct,
    deleteProduct
};

export default ProductService; 