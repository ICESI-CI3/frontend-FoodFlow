import { Product } from "./product";

export interface Order {
    image: string;
    name: string;
    tableNumber: Int32Array;
    orderStatus: string;
    price: Int32Array;
    id: string;
    products: Product[];
}