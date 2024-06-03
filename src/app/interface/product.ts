import { Ingredient } from "./ingredient";

export interface Product {
    image: string;
    name: string;
    description: string;
    price: Int32Array;
    category: string;
    id: string;
    ingredients: Ingredient[];
}