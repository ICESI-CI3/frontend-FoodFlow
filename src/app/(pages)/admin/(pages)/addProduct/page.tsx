"use client";

import { ProductForm } from "./components/productForm";
import { ListIngredientView } from "./components/listIngredientView";
import { IngredientContextProvider } from "@/app/(pages)/admin/(pages)/ingredient/context/ingredientContextProvider";
import { AddProductContextProvider } from "./context/addProductContextProvider";
import ProtectedRoute from "../../protected-route";

export default function Component() {
  return (
    <ProtectedRoute role="administrador">
        <AddProductContextProvider>
            <IngredientContextProvider>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 md:p-6">
                    <div className="grid gap-4">
                        <ProductForm />
                    </div>
                    <div className="col-span-2 grid gap-4">
                        <ListIngredientView />
                    </div>
                </div>
            </IngredientContextProvider>        
        </AddProductContextProvider>
    </ProtectedRoute>
  );
}
