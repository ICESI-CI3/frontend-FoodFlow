import { Ingredient } from "./ingredient";

export interface Product {
    image: string;
    name: string;
    description: string;
    price: string;
    category: string;
    id: string;
    ingredients: Ingredient[];
}