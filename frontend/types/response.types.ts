export interface SuccessPaginatedResponse<T> {
    page: number;
    size: number;
    totalElements: number;
    data: T;
    status: "SUCCESS" | "ERROR";
}

export interface SuccessMessageResponse {
    status: "SUCCESS" | "ERROR";
    message: string; 
}

export interface SuccessResponse<T> {
    data: T;
    status: "SUCCESS" | "ERROR";
}

export interface SuccessArrayResponse<T> {
    count: number;
    data: T;
    status: "SUCCESS" | "ERROR";
}
