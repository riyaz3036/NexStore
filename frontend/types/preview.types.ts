import { Category } from "./category.types";
import { Variant } from "./variant.types";

export interface PreviewVariant {
    category: Category;
    variants: Variant[];
}