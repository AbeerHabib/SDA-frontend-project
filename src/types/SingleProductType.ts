import { Product } from "./ProductType";

export type singleProductState = {
    product: Product | null;
    error: null | string
    isLoading: boolean
}
