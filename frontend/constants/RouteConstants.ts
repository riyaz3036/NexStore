const RouteConstants = {
    root: '/',
    home: '/home',
    login: '/login',
    register: '/register',
    favorites: '/favorites',
    orders: '/orders',
    products: '/products',
    product: '/product/:id',
    cart: '/cart',
    payment: '/payment'
};

export const secureRoutes = [RouteConstants.orders, RouteConstants.favorites, RouteConstants.cart, RouteConstants.payment];

export default RouteConstants;