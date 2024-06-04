import { Product } from "./product";

export interface Order {
    name: string;
    tableNumber: Number;
    orderStatus: string;
    price: Number;
    id: string;
    products: Product[];
}