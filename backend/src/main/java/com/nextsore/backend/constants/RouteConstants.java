package com.nextsore.backend.constants;

public class RouteConstants {
    // AUTH MODULE
    public static final String AUTH_MODULE = "/auth";
    public static final String REGISTER = "/register";
    public static final String LOGIN = "/login";


    // USER MODULE
    public static final String USER_MODULE = "/user";
    public static final String GET_ALL_USERS = "/";
    public static final String GET_USER_BY_ID = "/{id}";
    public static final String UPDATE_USER_BY_ID = "/{id}";
    public static final String DELETE_USER_BY_ID = "/{id}";


    // PRODUCT MODULE
    public static final String PRODUCT_MODULE = "/product";
    public static final String CREATE_PRODUCT = "/query";
    public static final String CREATE_MULTIPLE_PRODUCT = "/bulk";
    public static final String GET_ALL_PRODUCTS = "/";
    public static final String GET_ALL_PRODUCTS_WITHOUT_PAGINATION = "/all";
    public static final String GET_PRODUCT_BY_ID = "/{id}";
    public static final String UPDATE_PRODUCT_BY_ID = "/{id}";
    public static final String DELETE_PRODUCT_BY_ID = "/{id}";


    // VARIANT MODULE
    public static final String VARIANT_MODULE = "/variant";
    public static final String CREATE_VARIANT = "/query";
    public static final String CREATE_MULTIPLE_VARIANTS = "/bulk";
    public static final String GET_ALL_VARIANTS = "/all";
    public static final String GET_ALL_VARIANTS_BY_PRODUCT_ID = "/product/{productId}";
    public static final String GET_VARIANT_BY_ID = "/{id}";
    public static final String UPDATE_VARIANT_BY_ID = "/{id}";
    public static final String DELETE_VARIANT_BY_ID = "/{id}";
    public static final String GET_EXPANDED_PRODUCT_BY_VARIANT_ID = "/exp-product/{id}";


    // ORDER MODULE
    public static final String ORDER_MODULE = "/order";
    public static final String CREATE_ORDER = "/query";
    public static final String GET_ALL_ORDERS = "/";
    public static final String GET_ALL_ORDERS_BY_USER = "/user/{userId}";
    public static final String GET_ORDER_BY_ID = "/{id}";
    public static final String DELETE_ORDER_BY_ID = "/{id}";

    // CART MODULE
    public static final String CART_MODULE = "/cart";
    public static final String CREATE_MULTIPLE_CARTS = "/query";
    public static final String GET_ALL_CARTS = "/";
    public static final String GET_ALL_CARTS_BY_USER = "/user/{id}";
    public static final String GET_ALL_CARTS_BY_USER_WITHOUT_PAGINATION = "/user/all/{id}";
    public static final String GET_CART_BY_ID = "/{id}";
    public static final String UPDATE_CARTS_BY_ID = "/";
    public static final String DELETE_CART_BY_ID = "/{id}";
    public static final String EMPTY_CART_FOR_USER = "/empty/{userId}";

    // FAVORITE MODULE
    public static final String FAVORITE_MODULE = "/favorite";
    public static final String CREATE_FAV = "/query";
    public static final String GET_ALL_FAVS = "/";
    public static final String GET_FAV_BY_ID = "/{id}";
    public static final String GET_FAV_BY_USER_ID = "/user/{id}";
    public static final String GET_FAV_BY_USER_ID_AND_VARIANT_ID = "/variant";
    public static final String DELETE_FAV_BY_ID = "/{id}";

    // CATEGORY MODULE
    public static final String CATEGORY_MODULE = "/category";
    public static final String CREATE_CATEGORY = "/query";
    public static final String GET_ALL_CATEGORIES = "/";
    public static final String GET_CATEGORY_BY_ID = "/{id}";
    public static final String UPDATE_CATEGORY_BY_ID = "/{id}";
    public static final String DELETE_CATEGORY_BY_ID = "/{id}";


    // SAMPLE DATA MODULE
    public static final String PREVIEW_DATA_MODULE = "/preview";
    public static final String GET_PREVIEW_DATA = "/";
}