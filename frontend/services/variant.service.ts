import { CreateVariantRequest, UpdateVariantRequest, Variant, VariantFilter } from "@/types/variant.types";
import { ApiConstants } from "../constants/ApiConstants";
import getAxiosInstance from "./axios.service";
import { SuccessArrayResponse, SuccessMessageResponse, SuccessPaginatedResponse, SuccessResponse } from "@/types/response.types";
import { ExpandedProduct } from "@/types/product.types";

export const fetchVariants = (payload: VariantFilter, page: number): Promise<SuccessPaginatedResponse<Variant[]>> =>
    new Promise((resolve, reject) => {
        getAxiosInstance().post(ApiConstants.VARIANT.GET_ALL(page), { withCredentials: true, ...payload })
            .then((response) => {
                resolve(response?.data);
            })
            .catch((err) => reject(err));
    });

export const fetchVariant = (id: string): Promise<SuccessResponse<Variant>> =>
    new Promise((resolve, reject) => {
        getAxiosInstance().get(ApiConstants.VARIANT.GET_BY_ID(id), { withCredentials: true })
            .then((response) => {
                resolve(response?.data);
            })
            .catch((err) => reject(err));
    });


export const fetchVariantsByProductId = (productId: string): Promise<SuccessArrayResponse<Variant[]>> =>
    new Promise((resolve, reject) => {
        getAxiosInstance().get(ApiConstants.VARIANT.GET_BY_PRODUCT_ID(productId), { withCredentials: true })
            .then((response) => {
                resolve(response?.data);
            })
            .catch((err) => reject(err));
    });


export const createVariant = (payload: CreateVariantRequest): Promise<SuccessResponse<Variant>> =>
    new Promise((resolve, reject) => {
        getAxiosInstance().post(
            ApiConstants.VARIANT.CREATE(),
            { ...payload },
            { withCredentials: true }
        )
        .then((response) => {
            resolve(response?.data);
        })
        .catch((err) => reject(err));
    });

export const createMultipleVariants = (payload: CreateVariantRequest[]): Promise<SuccessMessageResponse> =>
    new Promise((resolve, reject) => {
        getAxiosInstance().post(
            ApiConstants.VARIANT.CREATE_MULTIPLE(),
            { ...payload },
            { withCredentials: true }
        )
        .then((response) => {
            resolve(response?.data);
        })
        .catch((err) => reject(err));
    });

export const updateVariant = (id: string, payload: UpdateVariantRequest): Promise<SuccessResponse<Variant>> =>
    new Promise((resolve, reject) => {
        getAxiosInstance().patch(
            ApiConstants.VARIANT.UPDATE_BY_ID(id),
            { ...payload },
            { withCredentials: true }
        )
        .then((response) => {
            resolve(response?.data);
        })
        .catch((err) => reject(err));
    });

export const deleteVariant = (id: string): Promise<SuccessMessageResponse> =>
    new Promise((resolve, reject) => {
        getAxiosInstance().delete(ApiConstants.VARIANT.DELETE_BY_ID(id), { withCredentials: true })
            .then((response) => {
                resolve(response?.data);
            })
            .catch((err) => reject(err));
    });

export const fetchExpandedProduct = (variantId: string): Promise<SuccessResponse<ExpandedProduct>> =>
    new Promise((resolve, reject) => {
        getAxiosInstance().get(ApiConstants.VARIANT.GET_EXPANDED_PRODUCT_BY_VARIANT_ID(variantId), { withCredentials: true })
            .then((response) => {
                resolve(response?.data);
            })
            .catch((err) => reject(err));
    });

const VariantService = {
    fetchVariants,
    fetchVariant,
    fetchVariantsByProductId,
    createVariant,
    createMultipleVariants,
    updateVariant,
    deleteVariant,
    fetchExpandedProduct
};

export default VariantService; 