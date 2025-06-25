import { SuccessArrayResponse } from "@/types/response.types";
import { ApiConstants } from "../constants/ApiConstants";
import getAxiosInstance from "./axios.service";
import { PreviewVariant } from "@/types/preview.types";

export const fetchPreviewData = (): Promise<SuccessArrayResponse<PreviewVariant[]>> =>
    new Promise((resolve, reject) => {
        getAxiosInstance().get(ApiConstants.PREVIEW_DATA.GET_PREVIEW_DATA(), { withCredentials: true })
            .then((response) => {
                resolve(response?.data);
            })
            .catch((err) => reject(err));
    });

const PreviewDataService = {
    fetchPreviewData
};

export default PreviewDataService; 