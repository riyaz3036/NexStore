import RouteConstants from "../constants/RouteConstants";

export const generateRoute = {
    product: (id: string) => RouteConstants.product.replace(':id', id),
    productWithCategoryFilter: (categoryId: string) => `${RouteConstants.products}?categoryId=${categoryId}`
}