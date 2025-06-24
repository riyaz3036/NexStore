export const ApiConstants = {
    // AUTH ENDPOINTS
    AUTH: {
        BASE: '/auth',
        REGISTER: () => `${ApiConstants.AUTH.BASE}/register`,
        LOGIN: () => `${ApiConstants.AUTH.BASE}/login`,
    },

    // USER ENDPOINTS
    USER: {
        BASE: '/user',
        GET_ALL: () => `${ApiConstants.USER.BASE}/`,
        GET_BY_ID: (id: string | number) => `${ApiConstants.USER.BASE}/${id}`,
        UPDATE_BY_ID: (id: string | number) => `${ApiConstants.USER.BASE}/${id}`,
        DELETE_BY_ID: (id: string | number) => `${ApiConstants.USER.BASE}/${id}`,
    },

    // PRODUCT ENDPOINTS
    PRODUCT: {
        BASE: '/product',
        CREATE: () => `${ApiConstants.PRODUCT.BASE}/query`,
        CREATE_MULTIPLE: () => `${ApiConstants.PRODUCT.BASE}/bulk`,
        GET_ALL: () => `${ApiConstants.PRODUCT.BASE}/`,
        GET_ALL_WITHOUT_PAGINATION: () => `${ApiConstants.PRODUCT.BASE}/all`,
        GET_BY_ID: (id: string | number) => `${ApiConstants.PRODUCT.BASE}/${id}`,
        UPDATE_BY_ID: (id: string | number) => `${ApiConstants.PRODUCT.BASE}/${id}`,
        DELETE_BY_ID: (id: string | number) => `${ApiConstants.PRODUCT.BASE}/${id}`,
    },

    // VARIANT ENDPOINTS
    VARIANT: {
        BASE: '/variant',
        CREATE: () => `${ApiConstants.VARIANT.BASE}/query`,
        CREATE_MULTIPLE: () => `${ApiConstants.VARIANT.BASE}/bulk`,
        GET_ALL: (page: number) => `${ApiConstants.VARIANT.BASE}/all?page=${page}`,
        GET_BY_ID: (id: string | number) => `${ApiConstants.VARIANT.BASE}/${id}`,
        GET_BY_PRODUCT_ID: (productId: string) => `${ApiConstants.VARIANT.BASE}/product/${productId}`,
        UPDATE_BY_ID: (id: string | number) => `${ApiConstants.VARIANT.BASE}/${id}`,
        DELETE_BY_ID: (id: string | number) => `${ApiConstants.VARIANT.BASE}/${id}`,
        GET_EXPANDED_PRODUCT_BY_VARIANT_ID: (id: string) => `${ApiConstants.VARIANT.BASE}/exp-product/${id}`,
    },

    // ORDER ENDPOINTS
    ORDER: {
        BASE: '/order',
        CREATE: () => `${ApiConstants.ORDER.BASE}/query`,
        GET_ALL: () => `${ApiConstants.ORDER.BASE}/`,
        GET_ALL_BY_USER: (userId: string, page: number) => `${ApiConstants.ORDER.BASE}/user/${userId}?page=${page}`,
        GET_BY_ID: (id: string | number) => `${ApiConstants.ORDER.BASE}/${id}`,
        DELETE_BY_ID: (id: string | number) => `${ApiConstants.ORDER.BASE}/${id}`,
    },

    // CART ENDPOINTS
    CART: {
        BASE: '/cart',
        CREATE_MULTIPLE: () => `${ApiConstants.CART.BASE}/query`,
        GET_ALL: () => `${ApiConstants.CART.BASE}/`,
        GET_ALL_BY_USER: (userId: string | number, page: number) => `${ApiConstants.CART.BASE}/user/${userId}?page=${page}`,
        GET_ALL_BY_USER_WITHOUT_PAGINATION: (userId: string | number) => `${ApiConstants.CART.BASE}/user/all/${userId}`,
        GET_BY_ID: (id: string | number) => `${ApiConstants.CART.BASE}/${id}`,
        UPDATE_CARTS: () => `${ApiConstants.CART.BASE}/`,
        DELETE_BY_ID: (id: string | number) => `${ApiConstants.CART.BASE}/${id}`,
        EMPTY_CART_FOR_USER: (userId: string | number) => `${ApiConstants.CART.BASE}/empty/${userId}`,
    },

    // FAVORITE ENDPOINTS
    FAVORITE: {
        BASE: '/favorite',
        CREATE: () => `${ApiConstants.FAVORITE.BASE}/query`,
        GET_ALL: () => `${ApiConstants.FAVORITE.BASE}/`,
        GET_BY_ID: (id: string | number) => `${ApiConstants.FAVORITE.BASE}/${id}`,
        GET_BY_USER_ID: (userId: string | number, page: number) => `${ApiConstants.FAVORITE.BASE}/user/${userId}?page=${page}`,
        GET_BY_USER_ID_VARIANT_ID: (userId: string, variantId: string) => `${ApiConstants.FAVORITE.BASE}/variant?userId=${userId}&variantId=${variantId}`,
        DELETE_BY_ID: (id: string | number) => `${ApiConstants.FAVORITE.BASE}/${id}`,
    },

    // CATEGORY ENDPOINTS
    CATEGORY: {
        BASE: '/category',
        CREATE: () => `${ApiConstants.CATEGORY.BASE}/query`,
        GET_ALL: () => `${ApiConstants.CATEGORY.BASE}/`,
        GET_BY_ID: (id: string | number) => `${ApiConstants.CATEGORY.BASE}/${id}`,
        UPDATE_BY_ID: (id: string | number) => `${ApiConstants.CATEGORY.BASE}/${id}`,
        DELETE_BY_ID: (id: string | number) => `${ApiConstants.CATEGORY.BASE}/${id}`,
    },

    // PREVIEW DATA ENDPOINTS
    PREVIEW_DATA: {
        BASE: '/preview',
        GET_PREVIEW_DATA: () => `${ApiConstants.PREVIEW_DATA.BASE}/`,
    },
};
